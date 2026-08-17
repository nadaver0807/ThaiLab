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

import { Costumer } from "@/costumer/Costumer.entity";
import { ReservationStatus } from "@shared/enums/reservation-status.enum";

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(() => Costumer, (costumer) => costumer.reservations)
  @JoinColumn({ name: "costumer_uuid" })
  costumer: Costumer;

  @Column({ type: "timestamp" })
  reservedAt: Date;

  @Column({ type: "int" })
  partySize: number;

  @Column({
    type: "enum",
    enum: ReservationStatus,
    default: ReservationStatus.Pending,
  })
  status: ReservationStatus;

  @Column({ type: "varchar", nullable: true })
  notes: string;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
