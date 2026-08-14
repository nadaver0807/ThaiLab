import { Router, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import { type Dish } from "./Dish.entity";
import { findAll, findByCategory, findById } from "./dish.service";
import { type DishCategory } from "@shared/enums/index.enum";

type GetDishesQuery = { category?: DishCategory };

type GetDishesResponse = Dish[];

type GetDishParams = { id: string };

type GetDishResponse = Dish | { message: string };

const dishRouter = Router();

dishRouter.get(
  "/",
  async (
    request: Request<unknown, GetDishesResponse, unknown, GetDishesQuery>,
    response: Response<GetDishesResponse>,
  ) => {
    const { category } = request.query;
    const dishes = category ? await findByCategory(category) : await findAll();

    response.status(StatusCodes.OK).json(dishes);
  },
);

dishRouter.get(
  "/:id",
  async (
    request: Request<GetDishParams, GetDishResponse>,
    response: Response<GetDishResponse>,
  ) => {
    const dish = await findById(request.params.id);

    if (!dish) {
      response.status(StatusCodes.NOT_FOUND).json({ message: "המנה לא נמצאה" });

      return;
    }

    response.status(StatusCodes.OK).json(dish);
  },
);

export default dishRouter;
