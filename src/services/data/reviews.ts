export interface Review {
  id: number;
  name: string;
  country: string;
  rating: number; // 1–5
  textKey: string; // ключ i18n
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Anna Müller",
    country: "Germany",
    rating: 5,
    textKey: "reviews.anna",
  },
  {
    id: 2,
    name: "Marco Rossi",
    country: "Italy",
    rating: 5,
    textKey: "reviews.marco",
  },
  {
    id: 3,
    name: "Emily Johnson",
    country: "USA",
    rating: 4,
    textKey: "reviews.emily",
  },
];
