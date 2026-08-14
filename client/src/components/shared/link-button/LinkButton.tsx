'use client';

import { type FC, type ReactNode } from 'react';
import NextLink from 'next/link';
import { Button } from '@mui/material';
import Styles from '@components/shared/link-button/LinkButton.style';

type LinkButtonProps = {
  href: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
};

const LinkButton: FC<LinkButtonProps> = ({
  href,
  variant = 'contained',
  size = 'medium',
  children,
}) => (
  <Button
    component={NextLink}
    href={href}
    variant={variant}
    size={size}
    sx={Styles.button}
  >
    {children}
  </Button>
);

export default LinkButton;
