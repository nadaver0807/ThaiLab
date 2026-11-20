import { type FC, type ReactNode } from 'react';
import NextLink from 'next/link';
import { Link } from '@mui/material';
import Styles from '@components/shared/checkbox/ThailabCheckbox.style';

type PolicyLinkProps = {
  href: string;
  children: ReactNode;
};

/** קישור למסמך משפטי בתוך תווית של תיבת סימון — נפתח בלשונית חדשה כדי לא לאבד את הטופס. */
const PolicyLink: FC<PolicyLinkProps> = ({ href, children }) => (
  <Link component={NextLink} href={href} target="_blank" rel="noopener noreferrer" sx={Styles.link}>
    {children}
  </Link>
);

export default PolicyLink;
