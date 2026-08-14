import { type DishCategory, type SpiceLevel } from '../enums/index.enum';

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  spiceLevel: SpiceLevel;
  imageUrl?: string;
  isVegan: boolean;
  isGlutenFree: boolean;
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
