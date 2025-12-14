export interface CountryInfo {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageText: string;
  foodAndLifeStyle: string;
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
    foodAndLifeStyle: "Food in Japan is simple and precise. Ramen, rice dishes and fresh fish are part of everyday life, and even small meals feel carefully prepared.",
    heroVideo: "/videos/Japan.mp4",
    capital: "Tokyo",
    currency: "JPY",
    image: "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Hirano-jinja-Shrine-in-Kyoto-Japan-during-full-bloom-cherry-blossom-season.jpg",
    imageText: "When is the best time to travel to Japan? Perhaps in spring, when the Japanese flock outdoors to immerse themselves in a pale pink sea of cherry blossoms. Parks, temple paths and quiet residential streets briefly turn into shared spaces of wonder, where people slow down, sit beneath blooming trees, and simply observe the passing moment. Perhaps it’s summer, when the days grow longer and the rhythm of life shifts toward the coast. Only the tip of Mount Fuji’s iconic volcanic cone remains snow-capped, while beachgoers plunge into the warm waters of Okinawa Prefecture, escaping the dense heat of the cities. Festivals fill the evenings with lanterns, music and movement. Or it’s autumn, when fiery red and golden maple forests accompany trekking routes through the historic Kiso Valley. The air becomes crisp and clear, mountain paths feel quieter, and long walks turn into moments of reflection framed by changing colors and ancient towns.Perhaps it’s even winter, when people linger in hot onsen baths as steam rises into the cold air, snow monkeys bask in natural hot springs in Hokkaido, and the country settles into a rare, almost meditative stillness. Streets grow calmer, routines soften, and time feels less urgent. We don’t know. Japan isn’t about choosing the perfect season —  it’s about discovering a different version of the country each time you arrive.",
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
    foodAndLifeStyle: "Food is international and easy to find. Middle Eastern dishes mix naturally with cuisines from around the world, often served in carefully designed spaces.",
    heroVideo: "./videos/public/videos/5077164-hd_1920_1080_25fps.mp4",
    capital: "Dubai",
    currency: "AED",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Dubai Skyline",
    image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a"
  },
  {
    name: "Burj Khalifa",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a"
  },
  {
    name: "Desert Safari",
    image: "https://images.unsplash.com/photo-1518684079-54a9dfe8f5cf"
  },
  {
    name: "Sheikh Zayed Mosque",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5"
  }]
  },
  {
    id: "maldives",
    name: "Maldives",
    description: "The Maldives feels quiet from the first moment. Days slow down without effort, and nothing competes with the ocean and open sky.",
    foodAndLifeStyle: "Meals are light and uncomplicated. Fresh fish, rice and simple flavors dominate, supporting the experience without drawing attention to themselves.",
    heroVideo: "/videos/Maldives.mp4",
    capital: "Male",
    currency: "USD",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Overwater Villas",
    image: "https://cloud.tui.com/pics/hotel/resize:fill:960:/aHR0cHM6Ly9waWNzLnR1aS5jb20vcGljcy9waWNzMTYwMHgxMjAwL3R1aS85Lzk1YWRmMDcxLTY3ODItNGUxMi04ZTI5LWI5MzFmYWNjNGQyZS5qcGc="
  },
  {
    name: "Turquoise Lagoons",
    image: "https://i.pinimg.com/1200x/94/71/11/94711108a07224cfeb24d90e635a6b8a.jpg"
  },
  {
    name: "Snorkeling Reefs",
    image: "https://i.pinimg.com/1200x/18/93/77/1893772c5ce802e08d021f1564e0a5ef.jpg"
  },
  {
    name: "Sunset Beaches",
    image: "https://i.pinimg.com/736x/2f/e6/e4/2fe6e49ae6ab78c374fd6537e0742d7c.jpg"
  }]
  },
  {
    id: "spain",
    name: "Spain",
    description: "Spain lives mostly outside. Evenings start late, conversations stretch, and daily life feels open and social.",
    foodAndLifeStyle: "Food is meant to be shared. Simple ingredients, strong flavors and long meals turn eating into a natural part of social life.",
    heroVideo: "/videos/Spain.mp4",
    capital: "Madrid",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Barcelona Streets",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
  },
  {
    name: "Sagrada Familia",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
  },
  {
    name: "Seville Old Town",
    image: "https://images.unsplash.com/photo-1548786811-960f0f3f4c9b"
  },
  {
    name: "Costa Brava",
    image: "https://images.unsplash.com/photo-1505731131651-3c68dbe3f8b8"
  }]
  },

  {
    id: "greece",
    name: "Greece",
    description: "Greece feels sun-worn and calm. Nothing tries to look new, and days move at an unhurried, comfortable pace.",
    foodAndLifeStyle:"Meals are familiar and simple. Vegetables, olive oil, fish and cheese appear again and again, without unnecessary complexity.",
    heroVideo: "/videos/Greece.mp4",
    capital: "Athens",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Santorini Cliffs",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    name: "Acropolis of Athens",
    image: "https://images.unsplash.com/photo-1526156225518-40c6f27b3f12"
  },
  {
    name: "Greek Islands",
    image: "https://images.unsplash.com/photo-1501959915551-4e8a04a7e5a4"
  },
  {
    name: "White Villages",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }]
  },

  {
    id: "italy",
    name: "Italy",
    description: "Italy quietly interrupts your sense of time. Plans stretch, meals get longer, and beauty appears when you stop trying to control the day.",
    foodAndLifeStyle: "Food is emotional and opinionated. Simple ingredients, strong traditions and regional habits shape every meal.",
    heroVideo: "/videos/Italy.mp4",
    capital: "Rome",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Rome Streets",
    image: "https://images.unsplash.com/photo-1526481280690-7bdb028f2b6c"
  },
  {
    name: "Colosseum",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
  },
  {
    name: "Venice Canals",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92"
  },
  {
    name: "Tuscany Hills",
    image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b"
  }]
  },

  {
    id: "france",
    name: "France",
    description: "France doesn’t explain itself. It expects observation and patience, offering depth rather than instant impressions.",
    foodAndLifeStyle: "Meals are treated as moments, not tasks. Quality, timing and atmosphere matter as much as taste.",
    heroVideo: "/videos/France.mp4",
    capital: "Paris",
    currency: "EUR",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Paris Streets",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
  },
  {
    name: "Eiffel Tower",
    image: "https://images.unsplash.com/photo-1511732351569-75e13b6f5f87"
  },
  {
    name: "French Riviera",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
  },
  {
    name: "Provence Fields",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }]
  },
  {
    id: "turkey",
    name: "Turkey",
    description: "Turkey feels welcoming without trying. History, daily life and tradition exist side by side, without clear boundaries.",
    foodAndLifeStyle: "Food is generous and comforting. Bread, vegetables, grilled dishes and long breakfasts are part of everyday rhythm.",
    heroVideo: "/videos/Turkey.mp4",
    capital: "Ankara",
    currency: "TRY",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Istanbul Old City",
    image: "https://images.unsplash.com/photo-1549640376-61c0c2bcb6b4"
  },
  {
    name: "Cappadocia Balloons",
    image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d"
  },
  {
    name: "Blue Mosque",
    image: "https://images.unsplash.com/photo-1583778176476-4a8b02b64c5c"
  },
  {
    name: "Turkish Coast",
    image: "https://images.unsplash.com/photo-1505731131651-3c68dbe3f8b8"
  }]
  },
  {
    id: "mexico",
    name: "Mexico",
    description: "Mexico feels alive and expressive. Colors, sounds and conversations overlap, creating a sense of constant movement.",
    foodAndLifeStyle: "Food is bold and deeply regional. Street meals, local spices and family recipes define the experience more than restaurants.",
    heroVideo: "/videos/Mexico.mp4",
    capital: "Mexico City",
    currency: "MXN",
    image: "",
    subtitle: "",
    imageText: "",
    places: [{
    name: "Mexico City",
    image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542"
  },
  {
    name: "Chichen Itza",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
  },
  {
    name: "Tulum Ruins",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
  },
  {
    name: "Colorful Streets",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
  }]
  },
];
