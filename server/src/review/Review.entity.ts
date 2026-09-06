import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReviewStatus } from '@shared/enums/review-status.enum';
import { ServiceType } from '@shared/enums/service-type.enum';

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  authorName: string;

  /** לא נחשף בתגובות ה-API הציבוריות — משמש רק ליצירת קשר חוזר. */
  @Column({ type: 'varchar' })
  authorEmail: string;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  /** ההזמנה שמזכה בכתיבת ביקורת — מונע ביקורות ממי שלא הזמין. */
  @Column({ type: 'uuid', nullable: true })
  orderUuid: string | null;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.Pending })
  status: ReviewStatus;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
