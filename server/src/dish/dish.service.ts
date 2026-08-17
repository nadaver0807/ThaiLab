import { type Dish } from "./Dish.entity";

const dishes: Dish[] = [];

export const findAll = async (): Promise<Dish[]> => dishes;

export const findByCategory = async (categoryUuid: string): Promise<Dish[]> =>
  dishes.filter((dish) => dish.category?.uuid === categoryUuid);

export const findById = async (uuid: string): Promise<Dish | undefined> =>
  dishes.find((dish) => dish.uuid === uuid);
