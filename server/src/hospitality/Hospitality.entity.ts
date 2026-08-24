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
import { HospitalityType } from "@shared/enums/hospitality-type.enum";
import { HospitalityStatus } from "@shared/enums/hospitality-status.enum";

@Entity()
export class Hospitality extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @ManyToOne(() => Costumer, (costumer) => costumer.hospitalities)
  @JoinColumn({ name: "costumer_uuid" })
  costumer: Costumer;

  @Column({ type: "enum", enum: HospitalityType })
  type: HospitalityType;

  @Column({
    type: "enum",
    enum: HospitalityStatus,
    default: HospitalityStatus.Requested,
  })
  status: HospitalityStatus;

  @Column({ type: "timestamp" })
  eventDate: Date;

  @Column({ type: "int" })
  guestCount: number;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "int", nullable: true })
  quotedPrice: number;

  @Column({ type: "varchar", nullable: true })
  notes: string;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
