import { SITE } from '@shared/consts/site.const';

/** שם העסק הרשום ומספר העוסק — מחרוזת ריקה כשהפרטים עוד לא הוזנו ב-`SITE`. */
export const getLegalIdentity = (): string =>
  [SITE.legalName, SITE.businessId && `עוסק מורשה / ח.פ. ${SITE.businessId}`]
    .filter(Boolean)
    .join(' · ');

/** פרטי העסק להצגה במסמכים משפטיים ובמיילים. */
export const getBusinessDetails = (): string[] =>
  [getLegalIdentity(), SITE.address, `טלפון: ${SITE.phone}`, `דוא"ל: ${SITE.email}`].filter(
    Boolean,
  );
