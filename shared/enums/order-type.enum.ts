export enum OrderType {
  Pickup = 'Pickup',
  Delivery = 'Delivery',
}

export const OrderTypeLabel: Record<OrderType, string> = {
  [OrderType.Pickup]: 'איסוף עצמי',
  [OrderType.Delivery]: 'משלוח',
};
