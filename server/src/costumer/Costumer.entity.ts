import { Hospitality } from '@/hospitality/Hospitality.entity';
import { Order } from '@/order/Order.entity';
import { Reservation } from '@/reservation/Reservation.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Costumer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar', default: '' })
  lastName: string;

  /** נדרש — משמש לשליחת אישור או דחייה של ההזמנה. */
  @Column({ type: 'varchar' })
  email: string;

  /** מפתח הזיהוי של לקוח חוזר — נשמר מנורמל (ספרות בלבד). */
  @Index({ unique: true })
  @Column({ type: 'varchar' })
  phone: string;

  /** כתובת המשלוח האחרונה — משמשת למילוי מראש בהזמנה הבאה. */
  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @OneToMany(() => Order, (order) => order.costumer)
  orders: Order[];

  @OneToMany(() => Reservation, (reservation) => reservation.costumer)
  reservations: Reservation[];

  @OneToMany(() => Hospitality, (hospitality) => hospitality.costumer)
  hospitalities: Hospitality[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
