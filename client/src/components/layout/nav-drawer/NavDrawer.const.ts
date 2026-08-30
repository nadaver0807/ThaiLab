import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { type SvgIconComponent } from '@mui/icons-material';
import { Route } from '@shared/enums/route.enum';

export type NavDrawerLink = {
  href: Route;
  label: string;
  Icon: SvgIconComponent;
};

/** ניווט ראשי — גלוי לכל המבקרים. */
export const PUBLIC_NAV_LINKS: NavDrawerLink[] = [
  { href: Route.Home, label: 'בית', Icon: HomeRoundedIcon },
  { href: Route.Menu, label: 'תפריט', Icon: RestaurantMenuRoundedIcon },
  { href: Route.About, label: 'אודות', Icon: InfoRoundedIcon },
  { href: Route.Contact, label: 'צור קשר', Icon: MailRoundedIcon },
];

/** ניווט ניהולי — מוצג רק למנהל מחובר. */
export const ADMIN_NAV_LINKS: NavDrawerLink[] = [
  { href: Route.AdminOrders, label: 'הזמנות לקוחות', Icon: ReceiptLongRoundedIcon },
  { href: Route.AdminLogin, label: 'ניהול', Icon: SettingsRoundedIcon },
];

export const ADMIN_SECTION_LABEL = 'ניהול';

export const NAV_DRAWER_LABEL = 'תפריט ניווט';
