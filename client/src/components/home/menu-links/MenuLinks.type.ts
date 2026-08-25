export type MenuLinkTone = 'dark' | 'cream';

export type MenuLink = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tone: MenuLinkTone;
};
