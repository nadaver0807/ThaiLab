'use client';

import { useState } from 'react';
import useValidateCoupon from '@/hooks/api/useValidateCoupon';

type AppliedCoupon = { code: string; discount: number; subtotal: number };

type UseCouponResult = {
  /** קוד פעיל — null אם לא הופעל קופון או שסכום הביניים השתנה מאז. */
  activeCode: string | null;
  discount: number;
  isPending: boolean;
  errorMessage?: string;
  apply: (code: string) => Promise<void>;
  remove: () => void;
};

/** מנהל קופון בצ'קאאוט. ההנחה תלויה בסכום הביניים, ולכן קופון ישן לא נחשב פעיל. */
const useCoupon = (subtotal: number): UseCouponResult => {
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { mutateAsync, isPending } = useValidateCoupon();

  const active = applied && applied.subtotal === subtotal ? applied : null;

  const apply = async (code: string) => {
    setErrorMessage(undefined);

    try {
      const result = await mutateAsync({ code: code.trim(), subtotal });

      setApplied({ code: result.code, discount: result.discount, subtotal });
    } catch (error) {
      setApplied(null);
      setErrorMessage((error as Error).message);
    }
  };

  const remove = () => {
    setApplied(null);
    setErrorMessage(undefined);
  };

  return {
    activeCode: active?.code ?? null,
    discount: active?.discount ?? 0,
    isPending,
    errorMessage,
    apply,
    remove,
  };
};

export default useCoupon;
