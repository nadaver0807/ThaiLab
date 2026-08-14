import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type ContactForm, contactSchema } from '@thailab/shared';
import { validateZodSchema } from '../middlewares/validateZodSchema.middleware';
import { type ContactMessage } from './ContactMessage.entity';
import { save } from './contact.service';

type SaveContactMessageResponse = ContactMessage;

const contactRouter = Router();

contactRouter.post(
  '/',
  validateZodSchema(contactSchema),
  async (
    request: Request<unknown, SaveContactMessageResponse, ContactForm>,
    response: Response<SaveContactMessageResponse>,
  ) => {
    const message = await save(request.body);

    response.status(StatusCodes.CREATED).json(message);
  },
);

export default contactRouter;
