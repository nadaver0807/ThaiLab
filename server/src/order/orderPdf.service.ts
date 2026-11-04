import fs from 'node:fs';
import path from 'node:path';
import { createElement as h, type ReactElement } from 'react';
import type * as ReactPdf from '@react-pdf/renderer';
import { OrderType, OrderTypeLabel } from '@shared/enums/order-type.enum';
import { type OrderSummary } from '@shared/types/order.type';

type DocumentProps = ReactPdf.DocumentProps;
type Styles = ReactPdf.Styles;

/**
 * הספרייה נטענת בטעינה עצלה: היא ESM בלבד, ובמצב פיתוח (`tsx`) טעינה סטטית שלה
 * מפילה את כל השרת בעלייה. כך השרת עולה תמיד, והשגיאה (אם יש) נוגעת רק ל-PDF.
 */
let Document!: typeof ReactPdf.Document;
let Font!: typeof ReactPdf.Font;
let Page!: typeof ReactPdf.Page;
let renderToBuffer!: typeof ReactPdf.renderToBuffer;
let StyleSheet!: typeof ReactPdf.StyleSheet;
let Text!: typeof ReactPdf.Text;
let View!: typeof ReactPdf.View;
let isPdfLibLoaded = false;

const loadPdfLib = async (): Promise<void> => {
  if (isPdfLibLoaded) {
    return;
  }

  const lib = await import('@react-pdf/renderer');

  ({ Document, Font, Page, renderToBuffer, StyleSheet, Text, View } = lib);
  isPdfLibLoaded = true;
};

const FONT_DIR_CANDIDATES = [
  path.resolve(process.cwd(), 'assets/fonts'),
  path.resolve(process.cwd(), 'server/assets/fonts'),
];

const FONT_FAMILY = 'Heebo';

const findFontDir = (): string => {
  const found = FONT_DIR_CANDIDATES.find((dir) =>
    fs.existsSync(path.join(dir, 'Heebo-Regular.ttf')),
  );

  if (!found) {
    throw new Error('PDF fonts not found (assets/fonts/Heebo-*.ttf)');
  }

  return found;
};

let isFontRegistered = false;

const registerFonts = (): void => {
  if (isFontRegistered) {
    return;
  }

  const dir = findFontDir();

  Font.register({
    family: FONT_FAMILY,
    fonts: [
      { src: path.join(dir, 'Heebo-Regular.ttf'), fontWeight: 400 },
      { src: path.join(dir, 'Heebo-Bold.ttf'), fontWeight: 700 },
    ],
  });

  // בלי זה react-pdf מנסה לשבור מילים עבריות באמצע
  Font.registerHyphenationCallback((word) => [word]);
  isFontRegistered = true;
};

const createStyles = () =>
  StyleSheet.create({
    page: {
      padding: 48,
      fontFamily: FONT_FAMILY,
      fontSize: 12,
      textAlign: 'right',
    },
    title: { fontSize: 22, fontWeight: 700, marginBottom: 10 },
    section: { fontSize: 14, fontWeight: 700, marginTop: 14, marginBottom: 4 },
    line: { marginBottom: 3 },
    small: { fontSize: 10, marginBottom: 3 },
    total: { fontSize: 16, fontWeight: 700, marginTop: 4, marginBottom: 3 },
  });

let styles!: ReturnType<typeof createStyles>;

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

const line = (text: string, style: Styles[string] = styles.line): ReactElement =>
  h(Text, { key: text, style }, text);

const pair = (label: string, value: string): ReactElement => line(`${label}: ${value}`);

const buildItemLines = (order: OrderSummary): ReactElement[] =>
  order.items.flatMap((item) => {
    const options = [item.variantLabel, ...item.selectedNotes].filter(Boolean).join(', ');
    const title = `${item.quantity} × ${item.dishName}${options ? ` (${options})` : ''} — ₪${
      item.unitPrice * item.quantity
    }`;

    return [
      h(Text, { key: item.uuid, style: styles.line }, title),
      ...(item.specialRequest
        ? [
            h(
              Text,
              { key: `${item.uuid}-note`, style: styles.small },
              `הערה: ${item.specialRequest}`,
            ),
          ]
        : []),
    ];
  });

const buildDocument = (order: OrderSummary): ReactElement<DocumentProps> => {
  const children: ReactElement[] = [
    h(Text, { key: 'title', style: styles.title }, 'ThaiLab — הזמנה'),
    pair('מספר הזמנה', order.uuid.slice(0, 8).toUpperCase()),
    pair('תאריך', formatDate(order.createDate)),
    pair('סוג', OrderTypeLabel[order.type]),
    pair('מועד מבוקש', order.scheduledFor ? formatDate(order.scheduledFor) : 'בהקדם האפשרי'),

    h(Text, { key: 'customer', style: styles.section }, 'פרטי הלקוח'),
    pair('שם', order.contactName),
    pair('טלפון', order.contactPhone),
    pair('אימייל', order.contactEmail),
  ];

  if (order.type === OrderType.Delivery && order.address) {
    children.push(pair('כתובת', order.address));
  }

  children.push(
    h(Text, { key: 'items', style: styles.section }, 'פריטים'),
    ...buildItemLines(order),
  );
  children.push(h(View, { key: 'gap', style: { height: 8 } }));
  children.push(pair('סכום ביניים', `₪${order.subtotal}`));

  if (order.deliveryFee > 0) {
    children.push(pair('דמי משלוח', `₪${order.deliveryFee}`));
  }

  if (order.discount > 0) {
    children.push(
      pair(`הנחה${order.couponCode ? ` (${order.couponCode})` : ''}`, `-₪${order.discount}`),
    );
  }

  children.push(line(`לתשלום: ₪${order.totalPrice}`, styles.total));
  children.push(pair('אמצעי תשלום', 'מזומן בלבד'));

  if (order.notes) {
    children.push(pair('הערות', order.notes));
  }

  return h(
    Document,
    null,
    h(Page, { size: 'A4', style: styles.page }, ...children),
  ) as ReactElement<DocumentProps>;
};

/** מחולל PDF של הזמנה — מצורף למייל לאדמין. */
export const renderOrderPdf = async (order: OrderSummary): Promise<Buffer> => {
  await loadPdfLib();
  styles ??= createStyles();
  registerFonts();

  return renderToBuffer(buildDocument(order));
};

export default { renderOrderPdf };
