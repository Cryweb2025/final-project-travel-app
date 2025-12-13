export interface CountryInfo {
  id: string;
  name: string;
  description: string;
  food: string;
  heroVideo: string;
  capital: string;
  currency: string;
}

export const countryInfoData: CountryInfo[] = [
  {
    id: "japan",
    name: "Japan",
    description:
      "Japan doesn’t feel dramatic at first. It feels calm, controlled, almost distant. And then — without noticing when — you relax and stop rushing.",
    food: "Food in Japan is simple and precise. Ramen, rice dishes and fresh fish are part of everyday life, and even small meals feel carefully prepared.",
    heroVideo: "/videos/Japan.mp4",
    capital: "Tokyo",
    currency: "JPY",
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    description:
      "Everything here feels planned and confident. Cities rise from the desert with scale and intention, and comfort is part of everyday life.",
    food: "Food is international and easy to find. Middle Eastern dishes mix naturally with cuisines from around the world, often served in carefully designed spaces.",
    heroVideo: "",
    capital: "Dubai",
    currency: "AED",
  },
  {
    id: "maldives",
    name: "Maldives",
    description:
      "The Maldives feels quiet from the first moment. Days slow down without effort, and nothing competes with the ocean and open sky.",
    food: "Meals are light and uncomplicated. Fresh fish, rice and simple flavors dominate, supporting the experience without drawing attention to themselves.",
    heroVideo: "/videos/Maldives.mp4",
    capital: "Male",
    currency: "MVR",
  },
  {
    id: "spain",
    name: "Spain",
    description:
      "Spain lives mostly outside. Evenings start late, conversations stretch, and daily life feels open and social.",
    food: "Food is meant to be shared. Simple ingredients, strong flavors and long meals turn eating into a natural part of social life.",
    heroVideo: "/videos/Spain.mp4",
    capital: "Madrid",
    currency: "EUR",
  },

  {
    id: "greece",
    name: "Greece",
    description:
      "Greece feels sun-worn and calm. Nothing tries to look new, and days move at an unhurried, comfortable pace.",
    food: "Meals are familiar and simple. Vegetables, olive oil, fish and cheese appear again and again, without unnecessary complexity.",
    heroVideo: "/videos/Greece.mp4",
    capital: "Athens",
    currency: "EUR",
  },

  {
    id: "italy",
    name: "Italy",
    description:
      "Italy quietly interrupts your sense of time. Plans stretch, meals get longer, and beauty appears when you stop trying to control the day.",
    food: "Food is emotional and opinionated. Simple ingredients, strong traditions and regional habits shape every meal.",
    heroVideo: "/videos/Italy.mp4",
    capital: "Rome",
    currency: "EUR",
  },

  {
    id: "france",
    name: "France",
    description:
      "France doesn’t explain itself. It expects observation and patience, offering depth rather than instant impressions.",
    food: "Meals are treated as moments, not tasks. Quality, timing and atmosphere matter as much as taste.",
    heroVideo: "/videos/France.mp4",
    capital: "Paris",
    currency: "EUR",
  },
  {
    id: "turkey",
    name: "Turkey",
    description:
      "Turkey feels welcoming without trying. History, daily life and tradition exist side by side, without clear boundaries.",
    food: "Food is generous and comforting. Bread, vegetables, grilled dishes and long breakfasts are part of everyday rhythm.",
    heroVideo: "/videos/Turkey.mp4",
    capital: "Ankara",
    currency: "TRY",
  },
  {
    id: "mexico",
    name: "Mexico",
    description:
      "Mexico feels alive and expressive. Colors, sounds and conversations overlap, creating a sense of constant movement.",
    food: "Food is bold and deeply regional. Street meals, local spices and family recipes define the experience more than restaurants.",
    heroVideo: "/videos/Mexico.mp4",
    capital: "Mexico City",
    currency: "MXN",
  },
];
