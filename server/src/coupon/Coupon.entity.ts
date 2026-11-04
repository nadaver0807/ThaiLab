import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CouponType } from '@shared/enums/coupon-type.enum';

@Entity()
export class Coupon extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /** הקוד שהלקוח מקליד — נשמר באותיות גדולות. */
  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ type: 'enum', enum: CouponType })
  type: CouponType;

  /** אחוזים (1–100) או סכום בשקלים, לפי `type`. */
  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'int', default: 0 })
  minSubtotal: number;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;

  @Column({ type: 'int', nullable: true })
  maxUses: number | null;

  @Column({ type: 'int', default: 0 })
  usedCount: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
