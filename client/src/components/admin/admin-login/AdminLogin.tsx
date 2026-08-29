'use client';

import { useState, type FC, type FormEvent } from 'react';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import { Route } from '@shared/enums/route.enum';
import useAuth from '@/hooks/auth/useAuth';
import useGetDishes from '@/hooks/api/useGetDishes';
import Styles from '@components/admin/admin-login/AdminLogin.style';

const AdminLogin: FC = () => {
  const { userEmail, signIn, isSigningIn, signInError, signOut } = useAuth();
  const { data } = useGetDishes();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAdmin = Boolean(data?.isAdmin);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      return;
    }

    try {
      await signIn({ email: email.trim(), password });
      setPassword('');
    } catch {
      // השגיאה מוצגת דרך `signInError`.
    }
  };

  if (!userEmail) {
    return (
      <Stack component="form" onSubmit={handleSubmit} sx={Styles.panel}>
        <Typography variant="h6" sx={Styles.title}>
          כניסת מנהל
        </Typography>
        <Typography variant="body2" sx={Styles.identity}>
          יש להזין את פרטי ההתחברות לניהול התפריט.
        </Typography>

        {signInError && <Alert severity="error">{signInError}</Alert>}

        <TextField
          size="small"
          type="email"
          label="אימייל"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          size="small"
          type="password"
          label="סיסמה"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Stack sx={Styles.actions}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSigningIn}
            startIcon={<LoginRoundedIcon />}
          >
            {isSigningIn ? 'מתחבר…' : 'כניסה'}
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={Styles.panel}>
      <Typography variant="h6" sx={Styles.title}>
        {isAdmin ? 'מצב ניהול פעיל' : 'אין הרשאות ניהול'}
      </Typography>
      <Typography variant="body2" sx={Styles.identity}>
        מחובר כ־
        <Typography component="span" variant="body2" sx={Styles.email}>
          {userEmail}
        </Typography>
      </Typography>
      <Stack sx={Styles.actions}>
        {isAdmin && (
          <Button variant="contained" href={Route.Menu} startIcon={<RestaurantMenuRoundedIcon />}>
            לניהול התפריט
          </Button>
        )}
        <Button variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={signOut}>
          התנתקות
        </Button>
      </Stack>
    </Stack>
  );
};

export default AdminLogin;
