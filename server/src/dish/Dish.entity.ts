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

import { Category } from "@/category/Category.entity";
import { SpiceLevel } from "@shared/enums/spice-level.enum";

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "varchar" })
  imageUrl: string;

  @Column({ type: "enum", enum: SpiceLevel, default: SpiceLevel.None })
  spiceLevel: SpiceLevel;

  @Column({ type: "boolean", default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category, (category) => category.dishes, { nullable: true })
  @JoinColumn({ name: "category_uuid" })
  category: Category;

  @CreateDateColumn()
  createDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
