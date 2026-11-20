import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { sendHtmlEmail } from '@/email/email.service';
import { renderDataRequestEmail } from '@/email/dataRequestEmail.template';
import { validateZodSchema } from '@/middlewares/validateZodSchema.middleware';
import { ADMIN_EMAIL } from '@/server.const';
import { logger, toSafeError } from '@/util/logger';
import { type MessageResponse } from '@shared/types/api.type';
import {
  dataRequestSchema,
  type DataRequestForm,
} from '@shared/validations/dataRequest.validation';

const dataRequestRouter = Router();

/**
 * בקשת עיון / תיקון / מחיקה של מידע אישי.
 * הבקשה לא נשמרת במסד הנתונים (מזעור מידע) — היא נשלחת לבעל העסק בדוא"ל,
 * שמטפל בה לאחר אימות זהות.
 */
dataRequestRouter.post(
  '/',
  validateZodSchema(dataRequestSchema),
  async (
    request: Request<unknown, MessageResponse, DataRequestForm>,
    response: Response<MessageResponse>,
  ) => {
    const form = request.body;

    try {
      await sendHtmlEmail({
        to: ADMIN_EMAIL,
        subject: `בקשה בנושא מידע אישי — ${form.fullName}`,
        html: renderDataRequestEmail(form),
        replyTo: form.email,
      });
    } catch (error) {
      logger.error({ err: toSafeError(error) }, 'failed to send data request email');

      response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'שליחת הבקשה נכשלה. נסו שוב מאוחר יותר או פנו אלינו בטלפון.' });

      return;
    }

    response.status(StatusCodes.OK).json({
      message: 'הבקשה התקבלה. נחזור אליכם לאימות זהות ולטיפול בבקשה, עד 30 יום.',
    });
  },
);

export default dataRequestRouter;
