'use client';

import { type FC, type ReactNode } from 'react';
import NextLink from 'next/link';
import { Button } from '@mui/material';
import Styles from '@components/shared/link-button/LinkButton.style';

type LinkButtonProps = {
  href: string;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  children: ReactNode;
};

const LinkButton: FC<LinkButtonProps> = ({
  href,
  variant = 'contained',
  size = 'medium',
  color = 'secondary',
  children,
}) => (
  <Button
    component={NextLink}
    href={href}
    variant={variant}
    size={size}
    color={color}
    sx={Styles.button}
  >
    {children}
  </Button>
);

export default LinkButton;
