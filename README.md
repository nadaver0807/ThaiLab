# ThaiLab

אתר לעסק אוכל תאילנדי — מונורepo עם שלוש חבילות עצמאיות.

## מבנה

| חבילה | תיאור | פורט |
|---|---|---|
| `client` | Next.js 16 (App Router) + MUI v7, עברית RTL | 3000 |
| `server` | Express 5 + Zod | 4000 |
| `shared` | סכמות Zod, טייפים, enums וקבועים משותפים | — |

`client` ו-`server` רצים כשירותים נפרדים ומדברים ביניהם ב-HTTP בלבד.
`shared` נצרך על ידי שניהם כחבילה `@thailab/shared` **ישירות מהמקור** (ללא שלב build),
ולעולם לא מייבא מהם.

## התקנה

```bash
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env.local
```

## הרצה

```bash
npm run dev          # server (4000) + client (3000)
npm run dev:server   # שרת בלבד
npm run dev:client   # לקוח בלבד
```

## סקריפטים

| פקודה | פעולה |
|---|---|
| `npm run build` | בניית production של הלקוח |
| `npm run typecheck` | בדיקת טיפוסים בשלוש החבילות |
| `npm run lint` | ESLint בכל שלוש החבילות |
| `npm run format` | Prettier על כל הקוד |

## סטנדרטים

הקוד נכתב לפי מסמך **"סטנדרטים לפיתוח"**. הכללים מתועדים ב-`AGENTS.md`
ובסוכנים `.claude/agents/client.md` ו-`.claude/agents/server.md`, ונאכפים ב-ESLint.
