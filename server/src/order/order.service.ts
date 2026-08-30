import { In } from 'typeorm';

import { AppDataSource } from '@/config/db/db.config';
import { Dish } from '@/dish/Dish.entity';
import { Order } from '@/order/Order.entity';
import { OrderItem } from '@/order-item/OrderItem.entity';
import { upsertByPhone } from '@/costumer/costumer.service';
import { notifyAdminOfNewOrder, notifyCustomerOfDecision } from '@/order/orderNotification.service';
import { DELIVERY_FEE } from '@shared/consts/order.const';
import { OrderStatus } from '@shared/enums/order-status.enum';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentStatus } from '@shared/enums/payment-status.enum';
import { type OrderSummary } from '@shared/types/order.type';
import { type CreateOrderPayload } from '@shared/validations/order.validation';

const OrderRepository = AppDataSource.getRepository(Order);
const DishRepository = AppDataSource.getRepository(Dish);

export class OrderValidationError extends Error {}

const toSummary = (order: Order): OrderSummary => ({
  uuid: order.uuid,
  status: order.status,
  type: order.type,
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  subtotal: order.subtotal,
  deliveryFee: order.deliveryFee,
  totalPrice: order.totalPrice,
  address: order.address,
  contactName: order.contactName,
  contactPhone: order.contactPhone,
  contactEmail: order.contactEmail,
  notes: order.notes,
  createDate: order.createDate.toISOString(),
  items: (order.items ?? []).map((item) => ({
    uuid: item.uuid,
    dishUuid: item.dish?.uuid ?? null,
    dishName: item.dishName,
    priceKey: item.priceKey,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    specialRequest: item.specialRequest,
  })),
});

export const create = async (payload: CreateOrderPayload): Promise<OrderSummary> => {
  const dishUuids = payload.items.map((item) => item.dishUuid);
  const dishes = await DishRepository.find({ where: { uuid: In(dishUuids) } });
  const dishByUuid = new Map(dishes.map((dish) => [dish.uuid, dish]));

  const items = payload.items.map((item) => {
    const dish = dishByUuid.get(item.dishUuid);

    if (!dish || !dish.isAvailable) {
      throw new OrderValidationError('אחת המנות בעגלה אינה זמינה יותר');
    }

    const unitPrice = dish.priceOptions?.[item.priceKey];

    if (typeof unitPrice !== 'number') {
      throw new OrderValidationError(
        `אפשרות המחיר "${item.priceKey}" אינה קיימת עבור ${dish.name}`,
      );
    }

    return OrderItem.create({
      dish,
      dishName: dish.name,
      priceKey: item.priceKey,
      quantity: item.quantity,
      unitPrice,
      specialRequest: item.specialRequest || null,
    });
  });

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = payload.type === OrderType.Delivery ? DELIVERY_FEE : 0;
  const address = payload.type === OrderType.Delivery ? (payload.address ?? null) : null;

  const costumer = await upsertByPhone(payload.customer, address ?? undefined);

  const order = OrderRepository.create({
    costumer,
    items,
    status: OrderStatus.Pending,
    type: payload.type,
    paymentMethod: payload.paymentMethod,
    paymentStatus: PaymentStatus.Unpaid,
    subtotal,
    deliveryFee,
    totalPrice: subtotal + deliveryFee,
    address,
    contactName: `${payload.customer.firstName} ${payload.customer.lastName ?? ''}`.trim(),
    contactPhone: costumer.phone,
    contactEmail: payload.customer.email,
    notes: payload.notes || null,
  });

  const summary = toSummary(await OrderRepository.save(order));

  void notifyAdminOfNewOrder(summary);

  return summary;
};

export const findAll = async (): Promise<OrderSummary[]> => {
  const orders = await OrderRepository.find({
    relations: { items: { dish: true }, costumer: true },
    order: { createDate: 'DESC' },
  });

  return orders.map(toSummary);
};

export const findByUuid = async (uuid: string): Promise<OrderSummary | null> => {
  const order = await OrderRepository.findOne({
    where: { uuid },
    relations: { items: { dish: true }, costumer: true },
  });

  return order ? toSummary(order) : null;
};

export const updateStatus = async (
  uuid: string,
  status: OrderStatus,
): Promise<OrderSummary | null> => {
  const order = await OrderRepository.findOne({
    where: { uuid },
    relations: { items: { dish: true } },
  });

  if (!order) {
    return null;
  }

  order.status = status;

  return toSummary(await OrderRepository.save(order));
};

export const applyDecision = async (
  uuid: string,
  isConfirmed: boolean,
): Promise<{ order: OrderSummary; wasAlreadyHandled: boolean } | null> => {
  const order = await OrderRepository.findOne({
    where: { uuid },
    relations: { items: { dish: true } },
  });

  if (!order) {
    return null;
  }

  if (order.status !== OrderStatus.Pending) {
    return { order: toSummary(order), wasAlreadyHandled: true };
  }

  order.status = isConfirmed ? OrderStatus.Confirmed : OrderStatus.Cancelled;

  const summary = toSummary(await OrderRepository.save(order));

  await notifyCustomerOfDecision(summary, isConfirmed);

  return { order: summary, wasAlreadyHandled: false };
};
