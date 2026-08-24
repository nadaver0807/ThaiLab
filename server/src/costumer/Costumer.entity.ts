import { Hospitality } from "@/hospitality/Hospitality.entity";
import { Order } from "@/order/Order.entity";
import { Reservation } from "@/reservation/Reservation.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Costumer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  phone: string;

  @OneToMany(() => Order, (order) => order.costumer)
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.costumer)
  reservations: Reservation[];

  @OneToMany(() => Hospitality, (hospitality) => hospitality.costumer)
  hospitalities: Hospitality[];

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
