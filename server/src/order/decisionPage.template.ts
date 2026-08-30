const FONT = 'font-family:Arial,Helvetica,sans-serif;';

type DecisionPageParams = {
  title: string;
  message: string;
  color: string;
};

export const renderDecisionPage = ({ title, message, color }: DecisionPageParams): string =>
  `<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title}</title>
  </head>
  <body style="${FONT}display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f6f5f1;">
    <main style="max-width:420px;padding:40px;text-align:center;background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
      <h1 style="color:${color};margin-top:0;">${title}</h1>
      <p style="color:#444;font-size:15px;line-height:1.6;">${message}</p>
    </main>
  </body>
</html>`;
