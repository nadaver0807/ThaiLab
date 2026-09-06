export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  context: string;
};

// TODO: להחליף בביקורות האמיתיות שעופר יעביר
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'placeholder-1',
    quote: 'ממתין לביקורת אמיתית.',
    author: 'שם הלקוח',
    context: 'ארוחת שף בבת שלמה',
  },
  {
    id: 'placeholder-2',
    quote: 'ממתין לביקורת אמיתית.',
    author: 'שם הלקוח',
    context: 'אירוע פרטי',
  },
  {
    id: 'placeholder-3',
    quote: 'ממתין לביקורת אמיתית.',
    author: 'שם הלקוח',
    context: 'טייק אווי',
  },
];
