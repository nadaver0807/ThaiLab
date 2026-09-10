# פריסה לייצור — ThaiLab

המדריך פורס ארבעה חלקים: **מסד נתונים**, **מיגרציות**, **שרת**, **קליינט**.

הערכת זמן: כ-30 דקות. כל השירותים המומלצים מציעים תוכנית חינם.

---

## 0. הכנה

```bash
npm run typecheck && npm run lint
git push origin main
```

צור סוד לחתימת אסימונים — שמור אותו, תזדקק לו בשלב 3:

```bash
openssl rand -hex 32
```

---

## 1. מסד נתונים (Neon)

1. היכנס ל-[neon.tech](https://neon.tech) → **New Project** → בחר אזור קרוב (`eu-central-1`).
2. העתק את ה-**Connection String**. נראה כך:
   ```
   postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

> חלופות: Railway Postgres, Supabase, Render Postgres. כולן עובדות עם אותו `DATABASE_URL`.

---

## 2. מיגרציות + זריעה

הרץ **מהמחשב שלך** מול מסד הייצור. מלא את `server/.env.production` (הקובץ כבר קיים, מוחרג מ-git):

```bash
DATABASE_URL=<המחרוזת מ-Neon>
DB_SSL=true
DB_SCHEMA=thailab
SEED_ADMIN_USERS=you@example.com:YourStrongPassword
```

הרץ:

```bash
cd server
npm run db:setup:prod
```

הפקודה טוענת את `.env.production` בלבד ואינה נוגעת ב-`.env` המקומי שלך.

היא מריצה שלושה שלבים: יצירת הסכימה והרחבת `uuid-ossp` → מיגרציות → זריעת התפריט והמנהלים.

לאחר מכן זמינות גם `npm run seed:prod` (עדכון תפריט/סיסמאות) ו-`npm run migration:run:prod` (מיגרציות חדשות בלבד).

> **כלל ברזל — לעולם לא עורכים מיגרציה שכבר רצה.**
> TypeORM שומר כל מיגרציה שהורצה בטבלת `migrations` ולא מריץ אותה שוב, ומכיוון ש-`synchronize`
> מוגדר `false` שום דבר לא משלים את הפער אוטומטית. עריכת קובץ ישן לא תשנה דבר במסד שכבר הריץ אותו —
> הקוד יסטה מהסכימה בפועל והאפליקציה תיפול עם `column X does not exist`.
> **כל שינוי סכימה, כולל תיקון טעות במיגרציה ישנה, נעשה במיגרציה חדשה בלבד.**
> במיגרציית תיקון השתמש ב-`IF NOT EXISTS` / `IF EXISTS`, כדי שגם מסד שנוצר מאפס יעבור אותה בשלום.

**אחרי כל שינוי סכימה חובה להריץ `npm run migration:run:prod`** — הפרודקשן הוא מסד נפרד עם מצב
מיגרציות משלו, ודיפלוי של קוד בלבד לא מעדכן אותו.

---

## 3. שרת (Railway)

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. **Settings**:
   - Root Directory: `/` (מונורפו — ההתקנה מהשורש)
   - Build Command: `npm install && npm run build -w @thailab/server`
   - Start Command: `npm run start -w @thailab/server`
3. **Variables** — הוסף:

   | משתנה                  | ערך                                    |
   | ---------------------- | -------------------------------------- |
   | `NODE_ENV`             | `production`                           |
   | `DATABASE_URL`         | המחרוזת מ-Neon                         |
   | `DB_SSL`               | `true`                                 |
   | `DB_SCHEMA`            | `thailab`                              |
   | `ADMIN_SESSION_SECRET` | הסוד משלב 0                            |
   | `CLIENT_ORIGIN`        | `https://thailab.co.il` — ללא `/` בסוף |
   | `SERVER_PUBLIC_URL`    | `https://api.thailab.co.il`            |
   | `RESEND_API_KEY`       | מפתח Resend                            |
   | `EMAIL_FROM`           | `ThaiLab <hello@thailab.co.il>`        |
   | `ADMIN_EMAIL`          | כתובת לקבלת פניות                      |

   `SERVER_PUBLIC_URL` בונה את קישורי אישור ההזמנה במייל ואת כתובות החזרה
   מדף הסליקה. בלעדיו הקישורים יצביעו ל-`localhost`.

   **אל תגדיר `PORT`** — Railway מזריק אותו אוטומטית.

4. **Settings → Networking → Custom Domain**: הוסף `api.thailab.co.il`
   והצב את רשומת ה-CNAME שRailway מציג אצל רשם הדומיין.
5. ודא: `curl https://api.thailab.co.il/health` → `{"status":"ok"}`

---

## 4. קליינט (Vercel)

1. [vercel.com](https://vercel.com) → **Add New Project** → בחר את הריפו.
2. **Root Directory**: `client`
3. **Environment Variables**:

   | משתנה                      | ערך                             |
   | -------------------------- | ------------------------------- |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://api.thailab.co.il/api` |

   שים לב לסיומת `/api`.

4. **Deploy**, ואז **Settings → Domains**: הוסף `thailab.co.il`
   ו-`www.thailab.co.il` לפי ההוראות של Vercel אצל רשם הדומיין.

---

## 5. סגירת המעגל (חובה)

ודא שב-Railway מוגדר:

```
CLIENT_ORIGIN=https://thailab.co.il
```

בלי זה הדפדפן יחסום כל קריאה ל-API בגלל CORS. הכתובת **ללא** `/` בסוף.

---

## 6. סליקת אשראי (אופציונלי)

**דלג על השלב הזה עד שעופר ימסור את פרטי חברת הסליקה.** כל עוד
`PAYMENT_PROVIDER` אינו מוגדר, אפשרות התשלום באשראי מוסתרת בצ'קאאוט
והאתר עובד עם תשלום בעת האיסוף בלבד.

הוסף ב-Railway:

| משתנה                 | ערך                                             |
| --------------------- | ----------------------------------------------- |
| `PAYMENT_PROVIDER`    | `CARDCOM` או `PAYPLUS`                          |
| `PAYMENT_TERMINAL_ID` | CardCom: מספר טרמינל. PayPlus: Payment Page UID |
| `PAYMENT_API_KEY`     | CardCom: ApiName. PayPlus: api_key              |
| `PAYMENT_API_SECRET`  | CardCom: ApiPassword. PayPlus: secret_key       |
| `PAYMENT_TEST_MODE`   | `true` עד לאימות מלא, אחר כך `false`            |

בממשק חברת הסליקה יש להגדיר את כתובת ה-webhook:

```
https://api.thailab.co.il/api/payments/:uuid/callback
```

ה-webhook הוא **המקור היחיד** שקובע שהזמנה שולמה — חזרת הדפדפן מדף
הסליקה לעולם אינה מעדכנת סטטוס תשלום.

לאחר ההגדרה בצע הזמנת בדיקה בסביבת ה-sandbox של הספק, ורק כשההזמנה
מסומנת `PAID` בפאנל הניהול העבר את `PAYMENT_TEST_MODE` ל-`false`.

---

## 7. בדיקות קבלה

| בדיקה                            | ציפייה                    |
| -------------------------------- | ------------------------- |
| `https://thailab.co.il/menu`     | התפריט נטען               |
| `https://thailab.co.il/admin`    | טופס כניסה                |
| כניסה עם פרטי `SEED_ADMIN_USERS` | "מצב ניהול פעיל"          |
| עריכת מנה                        | נשמר ומופיע לאחר רענון    |
| גלישה פרטית → `/menu`            | **ללא** כפתורי ניהול      |
| הזמנה מלאה עד דף התודה           | מייל מגיע ל-`ADMIN_EMAIL` |
| שליחת ביקורת                     | ממתינה לאישור בפאנל       |

---

## עדכון סיסמת מנהל

ערוך `SEED_ADMIN_USERS` ב-`server/.env.production` והרץ `npm run seed:prod`. זריעה חוזרת מעדכנת סיסמה קיימת.

---

## תקלות נפוצות

| תסמין                              | סיבה                                    |
| ---------------------------------- | --------------------------------------- |
| `CORS policy` בקונסול              | `CLIENT_ORIGIN` שגוי או עם `/` בסוף     |
| `ADMIN_SESSION_SECRET is required` | לא הוגדר ב-Railway                      |
| `no pg_hba.conf entry`             | חסר `DB_SSL=true`                       |
| `relation does not exist`          | שלב 2 לא רץ                             |
| קריאות API נכשלות ב-404            | חסר `/api` ב-`NEXT_PUBLIC_API_BASE_URL` |
| כל המשתמשים מנהלים                 | `SEED_ADMIN_USERS` מכיל כתובת לא נכונה  |
| אפשרות אשראי לא מופיעה בצ'קאאוט    | `PAYMENT_PROVIDER` לא מוגדר או שגוי     |
| "סליקת אשראי אינה מוגדרת"          | אותה סיבה — השרת עלה בלי משתני הסליקה   |
| הזמנה נשארת `PENDING` אחרי תשלום   | ה-webhook לא מוגדר או לא מגיע לשרת      |
| קישורים במייל מצביעים ל-localhost  | חסר `SERVER_PUBLIC_URL`                 |
