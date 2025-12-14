export interface CountryInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageText: string;
  food: string;
  heroVideo: string;
  capital: string;
  currency: string;
  image: string;
  places: {
  name: string;
  image: string;
}[];
}

export const countryInfoData: CountryInfo[] = [
  {
    id: "japan",
    name: "Japan",
    subtitle: "A country where ancient traditions meet futuristic cities",
    description: "Japan doesn’t feel dramatic at first. It feels calm, controlled, almost distant. And then — without noticing when — you relax and stop rushing.",
    food: "Food in Japan is simple and precise. Ramen, rice dishes and fresh fish are part of everyday life, and even small meals feel carefully prepared.",
    heroVideo: "/videos/Japan.mp4",
    capital: "Tokyo",
    currency: "JPY",
    image: "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Hirano-jinja-Shrine-in-Kyoto-Japan-during-full-bloom-cherry-blossom-season.jpg",
    imageText: "When is the best time to travel to Japan? Perhaps in spring, when the Japanese flock outdoors to immerse themselves in a pale pink sea of ​​cherry blossoms. Perhaps it's summer, when only the tip of Mount Fuji's iconic volcanic cone is still snow-capped and beachgoers plunge into the sea in Okinawa Prefecture. Or it's autumn, when the fiery red foliage of the maple forests accompanies trekking tours in the historic Kiso Valley. Perhaps it's even winter, when people especially enjoy soaking in hot onsen baths, snow monkeys bask in the hot springs of Hokkaido, and the entire country is enveloped in a unique stillness. We don't know. Because we believe Japan is worth a visit any time of year. ",
    places: [{
    name: "Kyoto",
    image: "https://i.pinimg.com/1200x/a6/d8/c6/a6d8c698649394fdb5f2d533a21d3066.jpg"
  },
  {
    name: "Mount Fuji",
    image: "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Tokyo Streets",
    image: "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  },
{
    name: "Geisha Culture",
    image: "https://i.pinimg.com/736x/5f/91/a2/5f91a298cd0468291087693ebfcae1bd.jpg"
    
  },
{
    name: "Tea Ceremony",
    image: "https://i.pinimg.com/1200x/00/6b/30/006b3028b6e39977aa5a0606894ae6eb.jpg"
    
  },
{
    name: "Onsen Experience",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/8b/6a/da/takaragawa-onsen.jpg?w=1200&h=1200&s=1"
    
  }]
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    description: "Everything here feels planned and confident. Cities rise from the desert with scale and intention, and comfort is part of everyday life.",
    food: "Food is international and easy to find. Middle Eastern dishes mix naturally with cuisines from around the world, often served in carefully designed spaces.",
    heroVideo: "",
    capital: "Dubai",
    currency: "AED",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },
  {
    id: "maldives",
    name: "Maldives",
    description: "The Maldives feels quiet from the first moment. Days slow down without effort, and nothing competes with the ocean and open sky.",
    food: "Meals are light and uncomplicated. Fresh fish, rice and simple flavors dominate, supporting the experience without drawing attention to themselves.",
    heroVideo: "/videos/Maldives.mp4",
    capital: "Male",
    currency: "MVR",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },
  {
    id: "spain",
    name: "Spain",
    description: "Spain lives mostly outside. Evenings start late, conversations stretch, and daily life feels open and social.",
    food: "Food is meant to be shared. Simple ingredients, strong flavors and long meals turn eating into a natural part of social life.",
    heroVideo: "/videos/Spain.mp4",
    capital: "Madrid",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },

  {
    id: "greece",
    name: "Greece",
    description: "Greece feels sun-worn and calm. Nothing tries to look new, and days move at an unhurried, comfortable pace.",
    food: "Meals are familiar and simple. Vegetables, olive oil, fish and cheese appear again and again, without unnecessary complexity.",
    heroVideo: "/videos/Greece.mp4",
    capital: "Athens",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },

  {
    id: "italy",
    name: "Italy",
    description: "Italy quietly interrupts your sense of time. Plans stretch, meals get longer, and beauty appears when you stop trying to control the day.",
    food: "Food is emotional and opinionated. Simple ingredients, strong traditions and regional habits shape every meal.",
    heroVideo: "/videos/Italy.mp4",
    capital: "Rome",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },

  {
    id: "france",
    name: "France",
    description: "France doesn’t explain itself. It expects observation and patience, offering depth rather than instant impressions.",
    food: "Meals are treated as moments, not tasks. Quality, timing and atmosphere matter as much as taste.",
    heroVideo: "/videos/France.mp4",
    capital: "Paris",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },
  {
    id: "turkey",
    name: "Turkey",
    description: "Turkey feels welcoming without trying. History, daily life and tradition exist side by side, without clear boundaries.",
    food: "Food is generous and comforting. Bread, vegetables, grilled dishes and long breakfasts are part of everyday rhythm.",
    heroVideo: "/videos/Turkey.mp4",
    capital: "Ankara",
    currency: "TRY",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },
  {
    id: "mexico",
    name: "Mexico",
    description: "Mexico feels alive and expressive. Colors, sounds and conversations overlap, creating a sense of constant movement.",
    food: "Food is bold and deeply regional. Street meals, local spices and family recipes define the experience more than restaurants.",
    heroVideo: "/videos/Mexico.mp4",
    capital: "Mexico City",
    currency: "MXN",
    image: "",
    subtitle: "",
    imageText: "",
    places: []
  },
];
