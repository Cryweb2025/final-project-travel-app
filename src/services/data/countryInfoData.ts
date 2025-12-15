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
    description:
      "Japan doesn’t feel dramatic at first. It feels calm, controlled, almost distant. And then — without noticing when — you relax and stop rushing.",
    foodAndLifeStyle:
      "Food in Japan is simple and precise. Ramen, rice dishes and fresh fish are part of everyday life, and even small meals feel carefully prepared.",
    heroVideo: "/videos/Japan.mp4",
    capital: "Tokyo",
    currency: "JPY",
    image:
      "https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-Hirano-jinja-Shrine-in-Kyoto-Japan-during-full-bloom-cherry-blossom-season.jpg",
    imageText:
      "When is the best time to travel to Japan? Perhaps in spring, when the Japanese flock outdoors to immerse themselves in a pale pink sea of cherry blossoms. Parks, temple paths and quiet residential streets briefly turn into shared spaces of wonder, where people slow down, sit beneath blooming trees, and simply observe the passing moment. Perhaps it’s summer, when the days grow longer and the rhythm of life shifts toward the coast. Only the tip of Mount Fuji’s iconic volcanic cone remains snow-capped, while beachgoers plunge into the warm waters of Okinawa Prefecture, escaping the dense heat of the cities. Festivals fill the evenings with lanterns, music and movement. Or it’s autumn, when fiery red and golden maple forests accompany trekking routes through the historic Kiso Valley. The air becomes crisp and clear, mountain paths feel quieter, and long walks turn into moments of reflection framed by changing colors and ancient towns.Perhaps it’s even winter, when people linger in hot onsen baths as steam rises into the cold air, snow monkeys bask in natural hot springs in Hokkaido, and the country settles into a rare, almost meditative stillness. Streets grow calmer, routines soften, and time feels less urgent. We don’t know. Japan isn’t about choosing the perfect season —  it’s about discovering a different version of the country each time you arrive.",
    places: [
      {
        name: "Kyoto",
        image:
          "https://i.pinimg.com/1200x/a6/d8/c6/a6d8c698649394fdb5f2d533a21d3066.jpg",
      },
      {
        name: "Mount Fuji",
        image:
          "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Tokyo Streets",
        image:
          "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        name: "Geisha Culture",
        image:
          "https://i.pinimg.com/736x/5f/91/a2/5f91a298cd0468291087693ebfcae1bd.jpg",
      },
      {
        name: "Tea Ceremony",
        image:
          "https://i.pinimg.com/1200x/00/6b/30/006b3028b6e39977aa5a0606894ae6eb.jpg",
      },
      {
        name: "Onsen Experience",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/8b/6a/da/takaragawa-onsen.jpg?w=1200&h=1200&s=1",
      },
    ],
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    description:
      "Everything here feels planned and confident. Cities rise from the desert with scale and intention, and comfort is part of everyday life.",
    foodAndLifeStyle:
      "Food is international and easy to find. Middle Eastern dishes mix naturally with cuisines from around the world, often served in carefully designed spaces.",
    heroVideo: "/videos/uae.mp4",
    capital: "Dubai",
    currency: "AED",
    image: "https://www.harpersbazaararabia.com/wp-content/uploads/sites/7/cloud/2021/09/09/hba-uae-croqned-best-travel-destination-1.jpg",
    subtitle: "",
    imageText:
      "The United Arab Emirates feels deliberately constructed, as if every detail has been carefully considered before it appeared. Cities emerge from the desert with confidence, defined by clean lines, glass surfaces and open spaces designed for comfort rather than chaos. The heat shapes daily rhythms — mornings start early, afternoons slow down, evenings come alive again.Beyond the skyline, the desert stretches endlessly, quiet and still, offering a striking contrast to the polished cities. Life here moves between innovation and tradition: futuristic architecture stands close to mosques, while long-standing customs quietly guide everyday interactions. The UAE isn’t about spontaneity — it’s about precision, scale and the feeling that everything is exactly where it is meant to be.",
    places: [
      {
        name: "Dubai Skyline",
        image: "https://cdn.excelproperties.ae/media/blog/hero/Best_Spots_to_View_the_Dubai_Skyline.webp",
      },
      {
        name: "Burj Khalifa",
        image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0e/98/39/39.jpg",
      },
      {
        name: "Desert Safari",
        image: "https://luxurydesertsafarii.com/wp-content/uploads/2025/07/07-1.webp",
      },
      {
        name: "Sheikh Zayed Mosque",
        image: "https://i.pinimg.com/1200x/3d/a7/e9/3da7e9ff0918ebce937058d8b07cda45.jpg",
      },
      {
        name: "Palm Jumeirah",
        image: "https://i.pinimg.com/1200x/ef/b7/93/efb793bdeac797daceb4b8317e595d1c.jpg",
      },
      {
        name: "Burj Al Arab",
        image: "https://i.pinimg.com/736x/d0/90/fd/d090fd4e865de6b475bcb15d27c5d8e1.jpg",
      },
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    description:
      "The Maldives feels quiet from the first moment. Days slow down without effort, and nothing competes with the ocean and open sky.",
    foodAndLifeStyle:
      "Meals are light and uncomplicated. Fresh fish, rice and simple flavors dominate, supporting the experience without drawing attention to themselves.",
    heroVideo: "/videos/Maldives.mp4",
    capital: "Male",
    currency: "USD",
    image: "https://i.pinimg.com/736x/f6/9f/02/f69f02fa014eb5005fb6ffedb7cb3e18.jpg",
    subtitle: "",
    imageText:
      "The Maldives doesn’t ask for attention — it removes distractions. Days unfold slowly, guided by sunlight, tides and the quiet movement of water beneath wooden walkways. The horizon remains uninterrupted, and the sound of waves replaces schedules and urgency.Life here is intentionally minimal. Spaces are open, colors are soft, and everything revolves around the ocean. Even activity feels gentle — swimming, floating, watching the sky change. The Maldives isn’t about discovery through movement, but through stillness.",
    places: [
      {
        name: "Overwater Villas",
        image:
          "https://cloud.tui.com/pics/hotel/resize:fill:960:/aHR0cHM6Ly9waWNzLnR1aS5jb20vcGljcy9waWNzMTYwMHgxMjAwL3R1aS85Lzk1YWRmMDcxLTY3ODItNGUxMi04ZTI5LWI5MzFmYWNjNGQyZS5qcGc=",
      },
      {
        name: "Turquoise Lagoons",
        image:
          "https://i.pinimg.com/1200x/94/71/11/94711108a07224cfeb24d90e635a6b8a.jpg",
      },
      {
        name: "Snorkeling Reefs",
        image:
          "https://i.pinimg.com/1200x/18/93/77/1893772c5ce802e08d021f1564e0a5ef.jpg",
      },
      {
        name: "Sunset Beaches",
        image:
          "https://i.pinimg.com/736x/2f/e6/e4/2fe6e49ae6ab78c374fd6537e0742d7c.jpg",
      },

      {
        name: "Palm-Fringed Islands",
        image: "https://picfiles.alphacoders.com/600/thumb-1920-600880.jpg",
      },
      {
        name: "Indian Ocean Views",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      },
    ],
  },
  {
    id: "spain",
    name: "Spain",
    description:
      "Spain lives mostly outside. Evenings start late, conversations stretch, and daily life feels open and social.",
    foodAndLifeStyle:
      "Food is meant to be shared. Simple ingredients, strong flavors and long meals turn eating into a natural part of social life.",
    heroVideo: "/videos/Spain.mp4",
    capital: "Madrid",
    currency: "EUR",
    image: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/9fc6e563b8ba3e78eae604da7e58d983a5294d27/big-c18195b2dfe79a520e4ec9c43832057a.jpg",
    subtitle: "",
    imageText:
      "Spain moves outward. Life spills into streets, cafés and plazas, where conversations last longer than planned and schedules adjust naturally. The day builds slowly, reaching its peak in the evening when the heat softens and cities truly wake up.Tradition here isn’t preserved behind glass — it lives in daily routines. Meals stretch, voices overlap, and social life feels effortless. Spain doesn’t rush experiences; it lets them expand.",
    places: [
      {
        name: "Park Güell",
        image: "https://thirdeyetraveller.com/wp-content/uploads/Park-Guell-Barcelona.jpg",
      },
      {
        name: "Sagrada Familia",
        image: "https://cdn-imgix.headout.com/media/images/3bf1f991caf6ea560796c2a042650fd5-Sagrada%20Familia.jpeg",
      },
      {
        name: "Seville Old Town",
        image: "https://media.timeout.com/images/106174094/750/562/image.jpg",
      },
      {
        name: "Costa Brava",
        image: "https://cdn.sanity.io/images/nxpteyfv/goguides/8e0cc60a293547002ed6090f4932c235698b8bb6-1600x1066.jpg",
      },
      {
        name: "Flamenco & Traditions",
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/73/d7/57.jpg",
      },
      {
        name: "Ibiza & Mediterranean Coast",
        image: "https://imagedelivery.net/UpBbDZmjrt-WGPYbM3yOCA/78-ibiza-article-489-a-long-weekend-in-ibiza-17434370165391fd0b12be3.81352355/w=469,h=313",
      },
    ],
  },

  {
    id: "greece",
    name: "Greece",
    description: "Greece feels sun-worn and calm. Nothing tries to look new, and days move at an unhurried, comfortable pace.",
    foodAndLifeStyle: "Meals are familiar and simple. Vegetables, olive oil, fish and cheese appear again and again, without unnecessary complexity.",
    heroVideo: "/videos/Greece.mp4",
    capital: "Athens",
    currency: "EUR",
    image: "https://www.in2greece.com/english/wp-content/uploads/2024/07/map-1-1024x928.jpg",
    imageText: "Greece feels shaped by sunlight and age. Surfaces are worn smooth, colors softened by time, and nothing appears rushed or polished for effect. Days follow a familiar pattern — slow mornings, warm afternoons, long evenings.Life revolves around simplicity. Food, conversation and rest hold equal importance, and time feels flexible. Greece doesn’t impress — it comforts.",
    places: [
      {
        name: "Santorini Cliffs",
        image: "https://i.pinimg.com/736x/ef/75/1e/ef751e5a5d81a77e9e12dd93dc66f888.jpg",
      },
      {
        name: "Acropolis of Athens",
        image: "https://i.pinimg.com/736x/21/83/ab/2183ab07ff2e0e561e0e0738705d4343.jpg",
      },
      {
        name: "Navagio Beach",
        image: "https://i.pinimg.com/736x/e6/46/3c/e6463cda1548be01798ef0468aec23b8.jpg",
      },
      {
        name: "White Villages",
        image: "https://i.pinimg.com/1200x/bb/de/8e/bbde8edaa34a9c7bbe960234b0cbd3da.jpg",
      },
      {
        name: "Aegean Sea",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      },
      {
        name: "Greek Cuisine",
        image: "https://i.pinimg.com/1200x/2f/61/0a/2f610a390bb000066f3419891f92b9af.jpg",
      },
    ],
    subtitle: ""
  },

  {
    id: "italy",
    name: "Italy",
    description:
      "Italy quietly interrupts your sense of time. Plans stretch, meals get longer, and beauty appears when you stop trying to control the day.",
    foodAndLifeStyle:
      "Food is emotional and opinionated. Simple ingredients, strong traditions and regional habits shape every meal.",
    heroVideo: "/videos/Italy.mp4",
    capital: "Rome",
    currency: "EUR",
    image: "https://www.fodors.com/assets/destinations/659/boat-grand-canal-basilica-santa-maria-della-salute-venice-italy.jpg",
    subtitle: "",
    imageText:
      "Italy changes your sense of time. Plans loosen, meals extend, and everyday moments quietly take on importance. Beauty appears without announcement — in light on stone walls, in small gestures, in unplanned detours.Life here is expressive yet grounded. Tradition is deeply regional, personal and emotional. Italy rewards patience and attention.",
    places: [
      {
        name: "Amalfi Coast",
        image: "https://images.squarespace-cdn.com/content/v1/5478c524e4b05b52c35cebbf/1550810720644-2QTCQV8IJCEA4FC5LHFM/Positano.jpg",
      },
      {
        name: "Colosseum",
        image: "https://as1.ftcdn.net/v2/jpg/02/81/20/72/1000_F_281207281_gf4iAhkUWWhUB0UGv6pSn9SQIfRtkGZH.jpg",
      },
      {
        name: "Venice Canals",
        image: "https://cdn.britannica.com/63/153463-050-06B6270D/Grand-Canal-Venice.jpg",
      },
      {
        name: "Tuscany Hills",
        image: "https://d1bv4heaa2n05k.cloudfront.net/user-images/1464968940923/tuscany-italy-highlights_main_1464969002264.jpeg",
      },
      {
        name: "Italian Cuisine",
        image: "https://blog.italotreno.com/wp-content/uploads/2023/10/Cosa_mangiare_Roma_10_piatti_imperdibili.jpg",
      },
      {
        name: "Florenz",
        image: "https://italien.expert/wp-content/uploads/2021/05/Florenz-Toskana-Italien0.jpg",
      },
    ],
  },

  {
    id: "france",
    name: "France",
    description:
      "France doesn’t explain itself. It expects observation and patience, offering depth rather than instant impressions.",
    foodAndLifeStyle:
      "Meals are treated as moments, not tasks. Quality, timing and atmosphere matter as much as taste.",
    heroVideo: "/videos/France.mp4",
    capital: "Paris",
    currency: "EUR",
    image: "https://i.pinimg.com/1200x/34/fe/dd/34feddf8a34db6f4ed6cbfaac066bab7.jpg",
    subtitle: "",
    imageText:
      "France doesn’t offer immediate clarity. It asks for observation — of gestures, timing and atmosphere. Life unfolds with intention, shaped by routine and detail rather than spectacle.Meals are moments, not interruptions. Spaces are curated without feeling artificial. France reveals itself gradually, rewarding attention rather than speed.",
    places: [
      {
        name: "Eiffel tower",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      },
      {
        name: "Provence Lavender Fields",
        image: "https://www.onegirl-oneworld.com/wp-content/uploads/2019/11/Lavender-Tour-Provence-5.jpg",
      },
      {
        name: "French Riviera",
        image: "https://cdn.britannica.com/34/244734-050-6DD3B213/Aerial-view-of-French-Riviera-coast-Villefranche-sur-Mer-Nice-region-France.jpg",
      },
      {
        name: "Louvre Museum",
        image: "https://assets.cityexperiences.com/wp-content/uploads/2022/11/louvre_museum_exterior.jpg",
      },
      {
        name: "Local Bakeries",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      },
      {
        name: "Café Culture",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      },
    ],
  },
  {
    id: "turkey",
    name: "Turkey",
    description:
      "Turkey feels welcoming without trying. History, daily life and tradition exist side by side, without clear boundaries.",
    foodAndLifeStyle:
      "Food is generous and comforting. Bread, vegetables, grilled dishes and long breakfasts are part of everyday rhythm.",
    heroVideo: "/videos/Turkey.mp4",
    capital: "Ankara",
    currency: "TRY",
    image: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt289d3aab2da77bc9/6777f31f93a84b03b5a37ef2/BCC-2023-EXPLORER-Istanbul-Fun-things-to-do-in-Istanbul-HEADER_MOBILE.jpg?format=webp&quality=60&width=1440",
    subtitle: "",
    imageText:
      "Turkey feels lived-in. History, religion and daily routines exist side by side, without separation. Cities are busy, expressive and warm, while quieter regions offer space and calm.Hospitality is instinctive. Meals are generous, mornings are slow, and conversation feels unforced. Turkey doesn’t divide past and present — it lets them coexist.",
    places: [
      {
        name: "Istanbul Old City",
        image: "https://kated.com/wp-content/uploads/2020/05/TUR17b-Galata-Tower-Istanbul.jpg",
      },
      {
        name: "Cappadocia Balloons",
        image: "https://cdn-imgix.headout.com/media/images/40e65a8e75c76bb30f104d39f5279869-17762-cappadocia-cappadocia-goreme-sunrise-hot-air-balloon-tour-with-breakfast---transfer-001.jpg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&fit=crop",
      },
      {
        name: "Blue Mosque",
        image: "https://i.pinimg.com/1200x/fb/33/36/fb33362f5486d01585b6c6c3800afa97.jpg",
      },
      {
        name: "Turkish Coast",
        image: "https://img.turkiyetoday.com/images/2025/03/AdobeStock_726446311.jpeg",
      },
      {
        name: "Bazaar Streets",
        image: "https://entiretravel.imgix.net/getmedia/a67bcd1d-dc45-4597-a756-95de484c2468/pexels-sulav-loktam-2815242-5184645.jpg?auto=format",
      },
      {
        name: "Aegean Coast",
        image: "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/0f/d4/9c/bf/img-20170709-wa0017-largejpg.jpg",
      },
    ],
  },
  {
    id: "mexico",
    name: "Mexico",
    description:
      "Mexico feels alive and expressive. Colors, sounds and conversations overlap, creating a sense of constant movement.",
    foodAndLifeStyle:
      "Food is bold and deeply regional. Street meals, local spices and family recipes define the experience more than restaurants.",
    heroVideo: "/videos/Mexico.mp4",
    capital: "Mexico City",
    currency: "MXN",
    image: "https://i.pinimg.com/736x/6a/23/67/6a23673edb4b7782b1b7d59237eec495.jpg",
    subtitle: "",
    imageText:
      "Mexico feels expressive and alive. Daily life unfolds loudly, visually and emotionally. Colors dominate streets, voices overlap, and traditions appear naturally woven into the present.Food is memory, identity and connection. Movement defines the cities, while ancient structures remind you of time’s depth. Mexico doesn’t hide its energy — it shares it openly.",
    places: [
      {
        name: "Mexico City",
        image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542",
      },
      {
        name: "Chichen Itza",
        image: "https://i.pinimg.com/736x/54/78/c6/5478c6ee1e005a405720c51a45aab743.jpg",
      },
      {
        name: "Tulum Ruins",
        image: "https://i.pinimg.com/1200x/4b/1c/c6/4b1cc6703c7a0252629e6d5b958226b5.jpg",
      },
      {
        name: "Cenotes of Yucatán",
        image: "https://i.pinimg.com/736x/52/ed/3c/52ed3c02bba2641921f2d0933fa02599.jpg",
      },
      {
        name: "Día de los Muerto",
        image: "https://i.pinimg.com/736x/07/30/23/0730231ac42703fee1e1a76b671e93cd.jpg",
      },
      {
        name: "Caribbean Coast, Cancún",
        image: "https://i.pinimg.com/736x/7d/b7/d4/7db7d4eb23cdc043b5e77c3d22c741cc.jpg",
      },
    ],
  },
];
