

export interface CountryInfo {
  id: string;
  name: string;
  description: string;
  heroVideo: string;
  capital: string;
  currency: string;
}

export const countryInfoData: CountryInfo[] = [
  {
    id: "japan",
    name: "Japan",
    description:
      "Japan isn’t just a place — it’s a feeling. Neon reflections, ancient temples, quiet streets and ramen steam that warms more than just your hands. Once you arrive, you understand why people always return.",
    heroVideo: "/videos/Japan.mp4",
    capital: "Tokyo",
    currency: "JPY",
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    description: "Luxury tourism and desert",
    heroVideo: "",
    capital: "Dubai",
    currency: "AED",
  },
  {
    id: "maldives",
    name: "Maldives",
    description:
      "Crystal-clear water, white sand and silence broken only by the ocean. The Maldives is pure escape and slow luxury.",
    heroVideo: "/videos/Maldives.mp4",
    capital: "Malé",
    currency: "MVR",
  },
  {
    id: "spain",
    name: "Spain",
    description:
      "Spain lives loud and slow at the same time — flamenco nights, sun-drenched beaches and food meant to be shared.",
    heroVideo: "/videos/Spain.mp4",
    capital: "Madrid",
    currency: "EUR",
  },

  {
    id: "greece",
    name: "Greece",
    description:
      "White villages, deep blue seas and stories older than time. Greece feels like a postcard you can walk into.",
    heroVideo: "/videos/Greece.mp4",
    capital: "Athens",
    currency: "EUR",
  },

  {
    id: "italy",
    name: "Italy",
    description:
      "Italy is art, food and emotion. Every street, every meal, every moment feels intentionally beautiful.",
    heroVideo: "/videos/Italy.mp4",
    capital: "Rome",
    currency: "EUR",
  },

  {
    id: "france",
    name: "France",
    description:
      "Elegant, romantic and endlessly inspiring. France invites you to slow down and enjoy life’s finest details.",
    heroVideo: "/videos/France.mp4",
    capital: "Paris",
    currency: "EUR",
  },
  {
    id: "turkey",
    name: "Turkey",
    description:
      "Where East meets West. Turkey blends history, vibrant bazaars, seaside sunsets and rich cuisine into one unforgettable experience.",
    heroVideo: "/videos/Turkey.mp4",
    capital: "Ankara",
    currency: "TRY",
  },
   {
    id: "mexico",
    name: "Mexico",
    description:
      "Mexico is color, rhythm and warmth. From ancient pyramids to turquoise beaches, every journey here feels alive and unforgettable.",
    heroVideo: "/videos/Mexico.mp4",
    capital: "Mexico City",
    currency: "MXN",
  },
];
