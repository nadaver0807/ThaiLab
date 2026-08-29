import { DishCategory } from '@shared/enums/dish-category.enum';
import { SpiceLevel } from '@shared/enums/spice-level.enum';
import { PriceOptions } from './general.type';

export type Dish = {
  uuid: string;
  name: string;
  description: string;
  menuCategory: DishCategory;
  priceOptions: PriceOptions;
  spiceLevel: SpiceLevel;
  imageUrl?: string | null;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  notes?: string | null;
  displayOrder: number;
  isAvailable: boolean;
  basePrice: number;
};

export type NavLink = {
  href: string;
  label: string;
};

export type SocialLinks = {
  instagram: string;
  facebook: string;
  whatsapp: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  social: SocialLinks;
};
