import { Dish } from "@/dish/Dish.entity";
import { Order } from "@/order/Order.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_uuid" })
  order: Order;

  @ManyToOne(() => Dish)
  @JoinColumn({ name: "dish_uuid" })
  dish: Dish;

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "int" })
  unitPrice: number;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
