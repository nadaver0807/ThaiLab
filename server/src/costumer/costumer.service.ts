import { AppDataSource } from '@/config/db/db.config';
import { Costumer } from '@/costumer/Costumer.entity';
import { type CustomerDetailsPayload } from '@shared/validations/order.validation';

const CostumerRepository = AppDataSource.getRepository(Costumer);

/**
 * מנרמל טלפון לספרות בלבד, כדי ש-"050-1234567" ו-"0501234567" יזוהו
 * כאותו לקוח חוזר.
 */
export const normalizePhone = (phone: string): string => phone.replace(/\D/g, '');

export const findByPhone = async (phone: string): Promise<Costumer | null> =>
  CostumerRepository.findOne({ where: { phone: normalizePhone(phone) } });

/**
 * מוצא לקוח קיים לפי טלפון ומעדכן את פרטיו, או יוצר לקוח חדש.
 * שדות ריקים לא דורסים מידע קיים.
 */
export const upsertByPhone = async (
  details: CustomerDetailsPayload,
  address?: string,
): Promise<Costumer> => {
  const phone = normalizePhone(details.phone);
  const existing = await CostumerRepository.findOne({ where: { phone } });

  if (!existing) {
    return CostumerRepository.save(
      CostumerRepository.create({
        firstName: details.firstName,
        lastName: details.lastName ?? '',
        email: details.email,
        phone,
        address: address || null,
      }),
    );
  }

  existing.firstName = details.firstName;
  existing.lastName = details.lastName || existing.lastName;
  existing.email = details.email;
  existing.address = address || existing.address;

  return CostumerRepository.save(existing);
};
