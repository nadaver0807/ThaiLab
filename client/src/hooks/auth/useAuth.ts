'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type LoginResponse } from '@shared/types/auth.type';
import { type LoginPayload } from '@shared/validations/auth.validation';
import Api from '@/hooks/api/api.util';
import { API_ROUTES } from '@/hooks/api/api.const';
import {
  getServerSession,
  getSession,
  setSession,
  subscribeToSession,
} from '@/hooks/auth/session.store';

const useAuth = () => {
  const queryClient = useQueryClient();

  const session = useSyncExternalStore(subscribeToSession, getSession, getServerSession);

  const signInMutation = useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      const { data } = await Api.post<LoginResponse>(`${API_ROUTES.Auth}/login`, credentials);

      return data;
    },
    onSuccess: async (data) => {
      setSession(data);
      await queryClient.invalidateQueries();
    },
  });

  const signOut = useCallback(async () => {
    setSession(null);
    await queryClient.invalidateQueries();
  }, [queryClient]);

  return {
    userEmail: session?.email ?? null,
    signIn: signInMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    signInError: signInMutation.error?.message ?? null,
    signOut,
  };
};

export default useAuth;
