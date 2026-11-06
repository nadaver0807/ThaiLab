import { BaseEntity, Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

/** שעות הפעילות של יום אחד בשבוע. שבעה שורות בלבד — אחת לכל יום. */
@Entity()
export class OpeningHours extends BaseEntity {
  /** 0 = יום ראשון … 6 = שבת. */
  @PrimaryColumn({ type: 'int' })
  day: number;

  @Column({ type: 'boolean', default: true })
  isOpen: boolean;

  /** HH:MM */
  @Column({ type: 'varchar', length: 5 })
  open: string;

  /** HH:MM */
  @Column({ type: 'varchar', length: 5 })
  close: string;

  @UpdateDateColumn()
  updateDate: Date;
}
