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
} from "typeorm";

import { Costumer } from "@/costumer/Costumer.entity";
import { OrderItem } from "@/order-item/OrderItem.entity";
import { OrderStatus } from "@shared/enums/order-status.enum";
import { OrderType } from "@shared/enums/order-type.enum";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(() => Costumer, (costumer) => costumer.orders)
  @JoinColumn({ name: "costumer_uuid" })
  costumer: Costumer;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @Column({ type: "int", default: 0 })
  totalPrice: number;

  @Column({ type: "varchar", nullable: true })
  notes: string;

  @Column({type: 'enum', enum: OrderType})
  type:OrderType

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
