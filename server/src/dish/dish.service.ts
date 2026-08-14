import { type DishCategory } from '@thailab/shared';
import { type Dish } from './Dish.entity';

const dishes: Dish[] = [];

export const findAll = async (): Promise<Dish[]> => dishes;

export const findByCategory = async (category: DishCategory): Promise<Dish[]> =>
  dishes.filter((dish) => dish.category === category);

export const findById = async (id: string): Promise<Dish | undefined> =>
  dishes.find((dish) => dish.id === id);
