const accessibilityGlobal = {
  ':root': { '--a11y-font-scale': 1 },
  'html[data-a11y-contrast]': {
    fontSize: 'calc(100% * var(--a11y-font-scale, 1))',
    '--a11y-grayscale-filter': 'brightness(1)',
    '--a11y-contrast-filter': 'brightness(1)',
    filter: 'var(--a11y-grayscale-filter) var(--a11y-contrast-filter)',
  },
  'html[data-a11y-grayscale="true"]': {
    '--a11y-grayscale-filter': 'grayscale(100%)',
  },
  'html[data-a11y-contrast="high"]': {
    '--a11y-contrast-filter': 'contrast(1.35) saturate(1.2)',
  },
  'html[data-a11y-contrast="dark"]': {
    '--a11y-contrast-filter': 'invert(1) hue-rotate(180deg)',
  },
  'html[data-a11y-contrast="dark"] img, html[data-a11y-contrast="dark"] video': {
    filter: 'invert(1) hue-rotate(180deg)',
  },
  'html[data-a11y-readable-font="true"] body, html[data-a11y-readable-font="true"] body *': {
    fontFamily: 'Arial, Helvetica, sans-serif !important',
    letterSpacing: '0.02em',
    wordSpacing: '0.08em',
  },
  'html[data-a11y-highlight-links="true"] a, html[data-a11y-highlight-links="true"] a *': {
    textDecoration: 'underline !important',
    outline: '2px solid currentColor',
    outlineOffset: 2,
  },
  'html[data-a11y-big-cursor="true"] body, html[data-a11y-big-cursor="true"] body *': {
    cursor: 'url("/images/big-cursor.svg") 4 4, auto',
  },
  'html[data-a11y-reduce-motion="true"] *': {
    animationDuration: '0.001ms !important',
    animationIterationCount: '1 !important',
    transitionDuration: '0.001ms !important',
    scrollBehavior: 'auto !important',
  },
  'a:focus-visible, button:focus-visible, [role="button"]:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible':
    {
      outline: '3px solid #B08D57',
      outlineOffset: 2,
      borderRadius: 4,
    },
};

const Styles = { accessibilityGlobal };

export default Styles;
