'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getUserEmail, setUserEmail } from '@/hooks/api/api.util';

type AuthContextValue = {
  userEmail: string | null;
  /** נכון רק אחרי קריאת ה-localStorage בצד הלקוח, כדי למנוע אי-התאמת hydration. */
  isReady: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [userEmail, setUserEmailState] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // localStorage אינו זמין בשרת, ולכן הזהות נטענת רק אחרי העלייה בדפדפן.
  useEffect(() => {
    setUserEmailState(getUserEmail());
    setIsReady(true);
  }, []);

  const signIn = useCallback(
    (email: string) => {
      const normalized = email.trim();

      setUserEmail(normalized);
      setUserEmailState(normalized);
      // הרשאות המשתמש השתנו — יש לרענן כל מידע שנשען עליהן.
      void queryClient.invalidateQueries();
    },
    [queryClient],
  );

  const signOut = useCallback(() => {
    setUserEmail(null);
    setUserEmailState(null);
    void queryClient.invalidateQueries();
  }, [queryClient]);

  const value = useMemo(
    () => ({ userEmail, isReady, signIn, signOut }),
    [userEmail, isReady, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
