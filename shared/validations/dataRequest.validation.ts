import { z } from 'zod';
import { DataRequestType } from '@shared/enums/data-request-type.enum';
import {
  email,
  enumValue,
  israeliPhone,
  limitedString,
  optionalString,
  requiredConsent,
} from '@shared/validations/common.validation';

export const dataRequestSchema = z.object({
  fullName: limitedString(2, 60),
  phone: israeliPhone(),
  email: email(),
  type: enumValue(DataRequestType),
  details: optionalString(1000),
  hasAcceptedPrivacy: requiredConsent(),
});

export type DataRequestForm = z.infer<typeof dataRequestSchema>;
