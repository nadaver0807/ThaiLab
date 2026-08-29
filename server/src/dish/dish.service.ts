import { AppDataSource } from '@/config/db/db.config';
import { Dish } from '@/dish/Dish.entity';
import { type DishCategory } from '@shared/enums/dish-category.enum';

const DishRepository = AppDataSource.getRepository(Dish);

/** סדר קבוע לתפריט — לפי קטגוריה ואז לפי סדר התצוגה של המנה. */
const MENU_ORDER = { menuCategory: 'ASC', displayOrder: 'ASC' } as const;

export const findAll = async (): Promise<Dish[]> => DishRepository.find({ order: MENU_ORDER });

export const findByCategory = async (menuCategory: DishCategory): Promise<Dish[]> =>
  DishRepository.find({ where: { menuCategory }, order: MENU_ORDER });

export const findByUuid = async (uuid: string): Promise<Dish | null> =>
  DishRepository.findOne({ where: { uuid } });

export const create = async (payload: Partial<Dish>): Promise<Dish> =>
  DishRepository.save(DishRepository.create(payload));

export const update = async (uuid: string, payload: Partial<Dish>): Promise<Dish | null> => {
  const dish = await DishRepository.findOne({ where: { uuid } });

  if (!dish) {
    return null;
  }

  DishRepository.merge(dish, payload);

  return DishRepository.save(dish);
};

/** מחיקה רכה — ההיסטוריה נשמרת דרך `deleteDate`. */
export const remove = async (uuid: string): Promise<boolean> => {
  const result = await DishRepository.softDelete({ uuid });

  return Boolean(result.affected);
};
