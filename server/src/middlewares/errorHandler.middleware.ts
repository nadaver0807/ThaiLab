import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  response
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'אירעה שגיאה בשרת' });
};

export const notFoundHandler = (_request: Request, response: Response): void => {
  response.status(StatusCodes.NOT_FOUND).json({ message: 'הנתיב לא נמצא' });
};
