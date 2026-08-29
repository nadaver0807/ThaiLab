import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '@/category/Category.entity';
import { DishCategory } from '@shared/enums/dish-category.enum';
import { SpiceLevel } from '@shared/enums/spice-level.enum';
import { type PriceOptions } from '@shared/types/general.type';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'jsonb', default: () => `'{}'::jsonb` })
  priceOptions: PriceOptions;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'enum', enum: DishCategory })
  menuCategory: DishCategory;

  @Column({ type: 'enum', enum: SpiceLevel, default: SpiceLevel.None })
  spiceLevel: SpiceLevel;

  @Column({ type: 'boolean', default: false })
  isVegetarian: boolean;

  @Column({ type: 'boolean', default: false })
  isVegan: boolean;

  @Column({ type: 'boolean', default: false })
  isGlutenFree: boolean;

  @Column({ type: 'varchar', nullable: true })
  notes: string | null;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category, (category) => category.dishes, { nullable: true })
  @JoinColumn({ name: 'category_uuid' })
  category: Category | null;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  /** המחיר הזול ביותר — נוח לתצוגת "החל מ-". */
  basePrice: number;

  @AfterLoad()
  calculateBasePrice() {
    const prices = Object.values(this.priceOptions ?? {});

    this.basePrice = prices.length ? Math.min(...prices) : 0;
  }
}
