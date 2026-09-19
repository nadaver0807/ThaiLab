import { type SxProps, type Theme } from '@mui/material';
import { OLIVE_GRADIENT } from '@theme/theme';

const layout: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  /**
   * `100vh` במובייל מתעלם מסרגל הכתובות ויוצר רווח מתחת ל-footer.
   * `100dvh` מתעדכן דינמית, עם נפילה ל-`100vh` בדפדפנים ישנים.
   */
  minHeight: '100vh',
  '@supports (min-height: 100dvh)': { minHeight: '100dvh' },
};

const main: SxProps<Theme> = {
  flex: '1 0 auto',
};

/** צובע את אזור ה-overscroll בתחתית באותו ירוק של ה-footer. */
const globalReset = {
  'html, body': { minHeight: '100%' },
  body: {
    margin: 0,
    backgroundImage: OLIVE_GRADIENT,
    backgroundAttachment: 'fixed',
    overscrollBehaviorY: 'none' as const,
  },
};

const Styles = { layout, main, globalReset };

export default Styles;
