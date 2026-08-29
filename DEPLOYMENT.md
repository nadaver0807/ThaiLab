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

---

## 3. שרת (Railway)

1. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. **Settings**:
   - Root Directory: `/` (מונורפו — ההתקנה מהשורש)
   - Build Command: `npm install && npm run build -w @thailab/server`
   - Start Command: `npm run start -w @thailab/server`
3. **Variables** — הוסף:

   | משתנה | ערך |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | המחרוזת מ-Neon |
   | `DB_SSL` | `true` |
   | `DB_SCHEMA` | `thailab` |
   | `ADMIN_SESSION_SECRET` | הסוד משלב 0 |
   | `CLIENT_ORIGIN` | זמנית `http://localhost:5173` — יעודכן בשלב 5 |
   | `RESEND_API_KEY` | מפתח Resend |
   | `EMAIL_FROM` | `ThaiLab <onboarding@resend.dev>` |
   | `ADMIN_EMAIL` | כתובת לקבלת פניות |

   **אל תגדיר `PORT`** — Railway מזריק אותו אוטומטית.

4. העתק את כתובת השרת: `https://xxx.up.railway.app`
5. ודא: `curl https://xxx.up.railway.app/health` → `{"status":"ok"}`

---

## 4. קליינט (Vercel)

1. [vercel.com](https://vercel.com) → **Add New Project** → בחר את הריפו.
2. **Root Directory**: `client`
3. **Environment Variables**:

   | משתנה | ערך |
   |---|---|
   | `NEXT_PUBLIC_API_BASE_URL` | `https://xxx.up.railway.app/api` |

   שים לב לסיומת `/api`.

4. **Deploy** → העתק את הכתובת: `https://your-app.vercel.app`

---

## 5. סגירת המעגל (חובה)

חזור ל-Railway ועדכן:

```
CLIENT_ORIGIN=https://your-app.vercel.app
```

בלי זה הדפדפן יחסום כל קריאה ל-API בגלל CORS. הכתובת **ללא** `/` בסוף.

---

## 6. בדיקות קבלה

| בדיקה | ציפייה |
|---|---|
| `https://your-app.vercel.app/menu` | התפריט נטען |
| `https://your-app.vercel.app/admin` | טופס כניסה |
| כניסה עם פרטי `SEED_ADMIN_USERS` | "מצב ניהול פעיל" |
| עריכת מנה | נשמר ומופיע לאחר רענון |
| גלישה פרטית → `/menu` | **ללא** כפתורי ניהול |

---

## עדכון סיסמת מנהל

ערוך `SEED_ADMIN_USERS` ב-`server/.env.production` והרץ `npm run seed:prod`. זריעה חוזרת מעדכנת סיסמה קיימת.

---

## תקלות נפוצות

| תסמין | סיבה |
|---|---|
| `CORS policy` בקונסול | `CLIENT_ORIGIN` שגוי או עם `/` בסוף |
| `ADMIN_SESSION_SECRET is required` | לא הוגדר ב-Railway |
| `no pg_hba.conf entry` | חסר `DB_SSL=true` |
| `relation does not exist` | שלב 2 לא רץ |
| קריאות API נכשלות ב-404 | חסר `/api` ב-`NEXT_PUBLIC_API_BASE_URL` |
| כל המשתמשים מנהלים | `SEED_ADMIN_USERS` מכיל כתובת לא נכונה |
