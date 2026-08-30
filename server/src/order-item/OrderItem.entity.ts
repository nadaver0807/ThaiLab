import { Dish } from '@/dish/Dish.entity';
import { Order } from '@/order/Order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_uuid' })
  order: Order;

  @ManyToOne(() => Dish, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'dish_uuid' })
  dish: Dish | null;

  @Column({ type: 'varchar' })
  dishName: string;

  @Column({ type: 'varchar', default: 'default' })
  priceKey: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  unitPrice: number;

  @Column({ type: 'varchar', nullable: true })
  specialRequest: string | null;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
