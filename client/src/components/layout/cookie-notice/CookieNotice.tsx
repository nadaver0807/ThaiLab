'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { Button, Link, Paper, Stack, Typography } from '@mui/material';
import { Route } from '@shared/enums/route.enum';
import useCookieNotice from '@/hooks/consent/useCookieNotice';
import Styles from '@components/layout/cookie-notice/CookieNotice.style';

/**
 * הודעת שימוש באחסון מקומי. האתר משתמש רק באחסון הכרחי (עגלה, נגישות, כניסת מנהל),
 * ולכן ההודעה מיידעת ואינה חוסמת דבר.
 * אם יתווסף בעתיד כלי סטטיסטיקה, פרסום או מעקב — חובה להפוך אותה לבקשת הסכמה
 * (קבל / דחה) ולטעון את הכלי רק לאחר הסכמה.
 */
const CookieNotice: FC = () => {
  const { isVisible, dismiss } = useCookieNotice();

  if (!isVisible) {
    return null;
  }

  return (
    <Paper role="region" aria-label="הודעה על אחסון בדפדפן" elevation={0} sx={Styles.notice}>
      <Typography variant="body2" sx={Styles.text}>
        האתר שומר בדפדפן שלך רק מידע הכרחי לתפעולו: עגלת ההזמנה והעדפות הנגישות שלך. איננו משתמשים
        בעוגיות פרסום, מעקב או סטטיסטיקה.
      </Typography>
      <Stack sx={Styles.actions}>
        <Button variant="contained" color="secondary" onClick={dismiss}>
          הבנתי
        </Button>
        <Link component={NextLink} href={Route.CookiePolicy} variant="body2">
          מדיניות עוגיות ואחסון
        </Link>
        <Link component={NextLink} href={Route.Privacy} variant="body2">
          מדיניות פרטיות
        </Link>
      </Stack>
    </Paper>
  );
};

export default CookieNotice;
