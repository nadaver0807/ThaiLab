'use client';

import { type FC, type ReactNode } from 'react';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import Styles from '@components/shared/nav-link/NavLink.style';

type NavLinkProps = {
  href: string;
  variant?: 'body1' | 'body2' | 'h3';
  children: ReactNode;
};

const NavLink: FC<NavLinkProps> = ({ href, variant = 'body2', children }) => (
  <Link component={NextLink} href={href} variant={variant} sx={Styles.link}>
    {children}
  </Link>
);

export default NavLink;
