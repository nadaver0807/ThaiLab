import { type Metadata } from 'next';
import AccessibilityStatement from '@/app/accessibility/AccessibilityStatement';
import {
  ACCESSIBILITY_PAGE_DESCRIPTION,
  ACCESSIBILITY_PAGE_TITLE,
} from '@/app/accessibility/AccessibilityStatement.const';

export const metadata: Metadata = {
  title: ACCESSIBILITY_PAGE_TITLE,
  description: ACCESSIBILITY_PAGE_DESCRIPTION,
};

const Page = () => <AccessibilityStatement />;

export default Page;
