import ContrastRoundedIcon from '@mui/icons-material/ContrastRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import FilterBAndWRoundedIcon from '@mui/icons-material/FilterBAndWRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MouseRoundedIcon from '@mui/icons-material/MouseRounded';
import SlowMotionVideoRoundedIcon from '@mui/icons-material/SlowMotionVideoRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import { type SvgIconComponent } from '@mui/icons-material';
import {
  type AccessibilityToggleKey,
  type ContrastMode,
} from '@/hooks/accessibility/accessibility.type';

export const ACCESSIBILITY_LABEL = 'תפריט נגישות';

export const ACCESSIBILITY_TITLE = 'הגדרות נגישות';

export const SKIP_LINK_LABEL = 'דילוג לתוכן הראשי';

export const MAIN_CONTENT_ID = 'main-content';

export const RESET_LABEL = 'איפוס הגדרות';

export const FONT_SECTION_LABEL = 'גודל טקסט';

export const DISPLAY_SECTION_LABEL = 'תצוגה';

export const STATEMENT_LABEL = 'הצהרת נגישות';

type ToggleOption = {
  key: AccessibilityToggleKey;
  label: string;
  Icon: SvgIconComponent;
};

type ContrastOption = {
  mode: Exclude<ContrastMode, 'default'>;
  label: string;
  Icon: SvgIconComponent;
};

export const CONTRAST_OPTIONS: ContrastOption[] = [
  { mode: 'high', label: 'ניגודיות גבוהה', Icon: ContrastRoundedIcon },
  { mode: 'dark', label: 'מצב כהה', Icon: DarkModeRoundedIcon },
];

export const TOGGLE_OPTIONS: ToggleOption[] = [
  { key: 'grayscale', label: 'גווני אפור', Icon: FilterBAndWRoundedIcon },
  { key: 'highlightLinks', label: 'הדגשת קישורים', Icon: LinkRoundedIcon },
  { key: 'readableFont', label: 'גופן קריא', Icon: TextFieldsRoundedIcon },
  { key: 'bigCursor', label: 'סמן גדול', Icon: MouseRoundedIcon },
  { key: 'reduceMotion', label: 'עצירת אנימציות', Icon: SlowMotionVideoRoundedIcon },
];
