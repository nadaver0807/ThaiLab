'use client';

import { type FC } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import Styles from '@components/layout/accessibility/AccessibilityGlobalStyles.style';

const AccessibilityGlobalStyles: FC = () => <GlobalStyles styles={Styles.accessibilityGlobal} />;

export default AccessibilityGlobalStyles;
