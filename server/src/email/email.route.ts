import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendEmailSchema, type SendEmailPayload } from '@shared/validations/email.validation';
import { type MessageResponse } from '@shared/types/api.type';
import { validateZodSchema } from '../middlewares/validateZodSchema.middleware';
import emailService from './email.service';

const emailRouter = Router();

emailRouter.post(
  '/',
  validateZodSchema(sendEmailSchema),
  async (
    request: Request<unknown, MessageResponse, SendEmailPayload>,
    response: Response<MessageResponse>,
  ) => {
    const { subject, fromName, replyTo, payload } = request.body;
    await emailService.sendEmail({ subject, fromName, replyTo, payload });

    response.status(StatusCodes.OK).json({ message: 'ההודעה נשלחה בהצלחה' });
  },
);

export default emailRouter;
