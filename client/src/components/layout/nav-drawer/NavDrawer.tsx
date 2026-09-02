'use client';

import { type FC } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SITE } from '@shared/consts/site.const';
import useAuth from '@/hooks/auth/useAuth';
import useGetDishes from '@/hooks/api/useGetDishes';
import useNavDrawer from '@/hooks/layout/useNavDrawer';
import Image from 'next/image';
import {
  ADMIN_NAV_LINKS,
  ADMIN_SECTION_LABEL,
  NAV_DRAWER_LABEL,
  PUBLIC_NAV_LINKS,
  type NavDrawerLink,
} from '@components/layout/nav-drawer/NavDrawer.const';
import Styles from '@components/layout/nav-drawer/NavDrawer.style';

/** תפריט הניווט הצדדי. קישורי הניהול מוצגים רק למנהל מחובר. */
const NavDrawer: FC = () => {
  const { isOpen, close } = useNavDrawer();
  const { userEmail } = useAuth();
  const { data } = useGetDishes();
  const pathname = usePathname();

  const isAdmin = Boolean(userEmail && data?.isAdmin);

  const renderLink = ({ href, label, Icon }: NavDrawerLink) => (
    <ListItemButton
      key={href}
      component={NextLink}
      href={href}
      onClick={close}
      selected={pathname === href}
      sx={pathname === href ? Styles.activeItem : undefined}
    >
      <ListItemIcon sx={Styles.icon}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={close}
      slotProps={{ paper: { sx: Styles.paper } }}
      aria-label={NAV_DRAWER_LABEL}
    >
      <Stack sx={Styles.header}>
        <Image src="/images/thailab-label.jpeg" alt={SITE.name} width={150} height={40} />
        <IconButton aria-label="סגירת התפריט" onClick={close}>
          <CloseRoundedIcon />
        </IconButton>
      </Stack>

      <List>{PUBLIC_NAV_LINKS.map(renderLink)}</List>

      {isAdmin && (
        <>
          <Divider />
          <Typography variant="body2" sx={Styles.sectionLabel}>
            {ADMIN_SECTION_LABEL}
          </Typography>
          <List>{ADMIN_NAV_LINKS.map(renderLink)}</List>
        </>
      )}
    </Drawer>
  );
};

export default NavDrawer;
