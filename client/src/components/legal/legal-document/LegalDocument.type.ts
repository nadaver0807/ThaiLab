export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalContent = {
  title: string;
  description: string;
  sections: LegalSection[];
};
