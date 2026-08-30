import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Costumer } from '@/costumer/Costumer.entity';
import { OrderItem } from '@/order-item/OrderItem.entity';
import { OrderStatus } from '@shared/enums/order-status.enum';
import { OrderType } from '@shared/enums/order-type.enum';
import { PaymentMethod } from '@shared/enums/payment-method.enum';
import { PaymentStatus } from '@shared/enums/payment-status.enum';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Costumer, (costumer) => costumer.orders)
  @JoinColumn({ name: 'costumer_uuid' })
  costumer: Costumer;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ type: 'int', default: 0 })
  subtotal: number;

  @Column({ type: 'int', default: 0 })
  deliveryFee: number;

  @Column({ type: 'int', default: 0 })
  totalPrice: number;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'varchar' })
  contactName: string;

  @Column({ type: 'varchar' })
  contactPhone: string;

  @Column({ type: 'varchar', default: '' })
  contactEmail: string;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.OnCollection })
  paymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.Unpaid })
  paymentStatus: PaymentStatus;

  @Column({ type: 'varchar', nullable: true })
  notes: string | null;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
