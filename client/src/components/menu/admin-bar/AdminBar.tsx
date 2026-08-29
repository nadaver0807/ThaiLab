'use client';

import { useState, type FC } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useAuth from '@/hooks/auth/useAuth';
import Styles from '@components/menu/admin-bar/AdminBar.style';

type AdminBarProps = {
  isAdmin: boolean;
};

/**
 * זיהוי מנהל לצורכי ניהול התפריט. זמני — עד לחיבור ספק זהות מלא.
 */
const AdminBar: FC<AdminBarProps> = ({ isAdmin }) => {
  const { userEmail, signIn, signOut } = useAuth();
  const [draftEmail, setDraftEmail] = useState('');

  const handleSignIn = () => {
    if (draftEmail.trim()) {
      signIn(draftEmail);
      setDraftEmail('');
    }
  };

  if (!userEmail) {
    return (
      <Stack sx={Styles.bar}>
        <Typography variant="body2" sx={Styles.identity}>
          כניסת מנהל
        </Typography>
        <Stack sx={Styles.actions}>
          <TextField
            size="small"
            label="אימייל"
            value={draftEmail}
            onChange={(event) => setDraftEmail(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSignIn();
              }
            }}
            sx={Styles.field}
          />
          <Button variant="outlined" onClick={handleSignIn}>
            כניסה
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={Styles.bar}>
      <Typography variant="body2" sx={Styles.identity}>
        מחובר כ־
        <Typography component="span" variant="body2" sx={Styles.email}>
          {userEmail}
        </Typography>
        {isAdmin ? ' — מצב ניהול פעיל' : ' — אין הרשאות ניהול'}
      </Typography>
      <Button variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={signOut}>
        התנתקות
      </Button>
    </Stack>
  );
};

export default AdminBar;
