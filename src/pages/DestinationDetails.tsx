import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type Hotel = {
  name: string;
  price: number;
  stars: number;
  images: string[]; // основной + дополнительные
};

const hotelsData: Record<string, Hotel[]> = {
  japan: [
    {
      name: "Tokyo Bay Hilton",
      price: 180,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe0GS_YfKyQ_FLpF8Tm6z1VMEFZdJ8dGwWXg&s",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Shinjuku View Hotel",
      price: 140,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Sakura Garden Inn",
      price: 95,
      stars: 3,
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Kyoto Royal Palace Hotel",
      price: 160,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600047509807-976f06af6571?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Osaka Central Plaza",
      price: 120,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Mount Fuji Resort",
      price: 200,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwk9q3sc8OAbs5OAv-0xGsYG51r1zIquo3nQ&s",
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Osaka Bay Hotel",
      price: 110,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTidHDhXqpBEu9mIDqsGxKKgL962wXYApcOjQ&s",
        "https://images.unsplash.com/photo-1542317854-9ca45a0088b6",
      ],
    },
    {
      name: "Imperial Tokyo Inn",
      price: 100,
      stars: 3,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjJB6Ji0jqCv2EFeU5cTOlqF2I9JMwzcs5lw&s",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      ],
    },
  ],

  mexico: [
    {
      name: "Cancun Beach Resort",
      price: 220,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnmQXA1bggpuNJ5v4KTU68ngpYg6LIK1hQ5g&s",
        "https://images.unsplash.com/photo-1498503188670-890fa89f2d3c?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Maya Palace Spa Hotel",
      price: 180,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1578898888179-e7d33d8c6dba?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Tulum Oceanfront",
      price: 250,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0E1ajL5mFJK4zMcDaugA7QsfBK5TJCSSzw&s",
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Mexico City Plaza Suites",
      price: 120,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Acapulco Golden Hotel",
      price: 140,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdzeSkrPEc0wmp8d5Fe9rvWg6-quqeX7yWyA&s",
      ],
    },
    {
      name: "Baja California Resort",
      price: 260,
      stars: 5,
      images: [
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Oaxaca Heritage Hotel",
      price: 140,
      stars: 4,
      images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d"],
    },
    {
      name: "Merida Colonial",
      price: 80,
      stars: 3,
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    },
  ],

  uae: [
    {
      name: "Burj Al Arab Resort",
      price: 500,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKy6c4acjh-eOmXSJwXDxCWHPiG5NASeG3sw&s",
      ],
    },
    {
      name: "Dubai Marina Hotel",
      price: 240,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYY_1ULsNWti1sfSi5ZdkX1O7J8W5HJ-LbnA&s",
      ],
    },
    {
      name: "Palm Jumeirah Luxury Suites",
      price: 420,
      stars: 5,
      images: [
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Abu Dhabi Seaside Hotel",
      price: 210,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lYtEb4n304g9AJ4UgXfAstNvIxsXKuEfng&s",
      ],
    },
    {
      name: "Desert Oasis Resort",
      price: 190,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSYHBSruD6H6xwjYVvvzM2UQH9sDxAkQPtw&s",
      ],
    },
    {
      name: "Dubai Crown Plaza",
      price: 150,
      stars: 3,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR36g1oDYdHI_lgJfMkR0qhyVUygJJcI4HtDg&s",
      ],
    },
    {
      name: "Golden Sand Palace",
      price: 250,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtljk-YGmuJHvM1iVuIwltUBzq5v9YuPu1vA&s",
      ],
    },
    {
      name: "Skyline Boutique",
      price: 210,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqlfByEHx9rcx2UEkyY7kSyyFo660KhbNRrQ&s",
      ],
    },
  ],

  turkey: [
    {
      name: "Istanbul Bosphorus Hotel",
      price: 130,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1523978591478-c753949ff840?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Antalya Beach Resort",
      price: 190,
      stars: 5,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Cappadocia Sky Cave Hotel",
      price: 160,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzB04RnKXF7O75QvGk2-b7fwVId2DWdhdfA&s",
      ],
    },
    {
      name: "Izmir Marina Suites",
      price: 120,
      stars: 3,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ6zlEOxpRGRoORyUgwwL9ogD7tFQGe5DWQQ&s",
      ],
    },
    {
      name: "Bodrum Luxury Villa",
      price: 230,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlMDvcehdgcUmdZkvCj6qtJKfkwgL1O2EmWA&s",
      ],
    },
    {
      name: "Ankara Central Hotel",
      price: 100,
      stars: 3,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5AdF6YaAM73HeUY10LrAhkL3j32xNoZaig&s",
      ],
    },
    {
      name: "Ephesus Grand Resort",
      price: 160,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj_cr38fbj9ua8gdlIzZw-Ke5O7f0Qer7yuQ&s",
      ],
    },
    {
      name: "Bosphorus Palace",
      price: 180,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
    },
  ],

  maldives: [
    {
      name: "Maldives Ocean Villa",
      price: 400,
      stars: 5,
      images: [
        "https://www.finolhu.com/wp-content/uploads/2024/02/luxury-resort-maldives-finolhu-rooms-ocean-pool-villa-terrace-1024x683.webp",
      ],
    },
    {
      name: "Blue Lagoon Resort",
      price: 350,
      stars: 5,
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/47/61/ea/caption.jpg?w=900&h=-1&s=1",
      ],
    },
    {
      name: "Coral Paradise Suite",
      price: 270,
      stars: 4,
      images: [
        "https://cache.marriott.com/content/dam/marriott-renditions/NASCT/nasct-suite-3898-hor-clsc.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1200px:*",
      ],
    },
    {
      name: "Island Breeze Hotel",
      price: 190,
      stars: 4,
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/578354072.jpg?k=fa662573655c29482b76c9af7c751c3a6785064b064d55f4929fa39bd192220f&o=",
      ],
    },
    {
      name: "Tropical Dream Resort",
      price: 210,
      stars: 4,
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345250769.jpg?k=935fe6eb0e1f810acf8c98becc9054c34fd3320c14d4352e85966ab4c8e44ea0&o=",
      ],
    },
    {
      name: "Luxury Pearl Water Villas",
      price: 480,
      stars: 5,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Ocean Paradise Resort",
      price: 260,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"],
    },
    {
      name: "Crystal Water Bungalows",
      price: 310,
      stars: 5,
      images: [
        "https://soneva-offload-media-library.storage.googleapis.com/wp-content/uploads/2025/04/03182313/Soneva-Jani-Aerial-1600x900.jpg",
      ],
    },
  ],

  spain: [
    {
      name: "Barcelona Beachfront",
      price: 160,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-LsWHkffZu2oiRbEiLvHpFRAnhbaf2G2djA&s",
      ],
    },
    {
      name: "Madrid Royal Suites",
      price: 190,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH8dlAthCiqNaDR1GBdHRYL5cV_V2NnQP8Ng&s",
      ],
    },
    {
      name: "Seville Andalusia Resort",
      price: 140,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Valencia Sun Hotel",
      price: 120,
      stars: 3,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sFTDLj8xyikPFuWBPteNUaLJvVOKiy68og&s",
      ],
    },
    {
      name: "Ibiza Paradise Club",
      price: 260,
      stars: 5,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR-vcxBFCryBxndzdawceQMjnwTZCMxSlHfg&s",
      ],
    },
    {
      name: "Granada Palace View",
      price: 140,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Sevilla Flamenco Suites",
      price: 140,
      stars: 4,
      images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"],
    },
    {
      name: "Mallorca Beach Palace",
      price: 200,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    },
  ],

  greece: [
    {
      name: "Santorini Blue Dome Suites",
      price: 250,
      stars: 5,
      images: [
        "https://www.santorini-secret.com/wp-content/uploads/2020/05/oia-blue-domes-1024x672.jpg",
      ],
    },
    {
      name: "Athens Acropolis Hotel",
      price: 150,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Crete Beach Villa",
      price: 210,
      stars: 4,
      images: [
        "https://admin.beleon.com/hotels/Crete-Beleon-Tours-Bella-Beach-Hotel-(01)_4259_Gallery.jpg?w=1140&h=600&mode=crop&scale=both",
      ],
    },
    {
      name: "Mykonos Sunset Resort",
      price: 280,
      stars: 5,
      images: [
        "https://www.anaxmykonos.gr/wp-content/uploads/2016/05/anax_resort_spa_mykonos_aegean_sunset_deluxe_double_room-2.jpg",
      ],
    },
    {
      name: "Rhodes Ocean Hotel",
      price: 170,
      stars: 4,
      images: [
        "https://hoteloceanispark.gr/wp-content/uploads/2024/06/Pool-2-3_Web_Res-1024x683.jpg",
      ],
    },
    {
      name: "Thessaloniki Plaza",
      price: 120,
      stars: 3,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Rhodes Sea Breeze",
      price: 110,
      stars: 3,
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    },
    {
      name: "Crete Sunrise Hotel",
      price: 140,
      stars: 4,
      images: [
        "https://attaches.1001tur.ru/hotels/gallery/609214/33641567513810.jpg",
      ],
    },
  ],

  italy: [
    {
      name: "Rome Colosseum View Hotel",
      price: 190,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Venice Grand Canal Suites",
      price: 260,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    },
    {
      name: "Florence Art Boutique",
      price: 180,
      stars: 4,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4jxUE3u46u2V7ayeIlFM9CI49j7ukeCw9A&s",
      ],
    },
    {
      name: "Milan Fashion Hotel",
      price: 220,
      stars: 5,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Naples Seaside Inn",
      price: 130,
      stars: 3,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Sicily Paradise Resort",
      price: 210,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Turin Central Inn",
      price: 90,
      stars: 3,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    },
    {
      name: "Venice Canal Suites",
      price: 220,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd"],
    },
  ],

  france: [
    {
      name: "Paris Eiffel View Hotel",
      price: 240,
      stars: 5,
      images: [
        "https://www.thetrainline.com/cms/media/9183/france-paris-pullman-hotel-eiffel-tower-room-view.jpg?mode=crop&width=860&height=574&quality=70",
      ],
    },
    {
      name: "Nice French Riviera Resort",
      price: 220,
      stars: 5,
      images: [
        "https://images.trvl-media.com/lodging/2000000/1590000/1580100/1580043/9a0058fa.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      ],
    },
    {
      name: "Lyon Central Palace",
      price: 150,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Strasbourg Boutique Hotel",
      price: 120,
      stars: 3,
      images: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/102940455.jpg?k=28b6dccbe8547a90b56107915c79883ffd3449ad8cf82c9dbf750616ab6d6e7a&o=",
      ],
    },
    {
      name: "Bordeaux Wine Estate Hotel",
      price: 190,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Marseille Coast Resort",
      price: 160,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      ],
    },
    {
      name: "Paris Central Luxury",
      price: 250,
      stars: 5,
      images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"],
    },
    {
      name: "Nice Royal Plaza",
      price: 90,
      stars: 3,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"],
    },
  ],
};

const DestinationDetails: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const rawHotels = hotelsData[key || ""] || [];

  // filter & sort UI state
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sort, setSort] = useState<"stars_desc" | "stars_asc">("stars_desc");

  // carousel (top) state
  const [carouselIndex, setCarouselIndex] = useState(0);

  // modal for hotel gallery
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHotel, setModalHotel] = useState<Hotel | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // compute min/max available prices for quick defaults
  const prices = rawHotels.map((h) => h.price);
  const globalMin = prices.length ? Math.min(...prices) : 0;
  const globalMax = prices.length ? Math.max(...prices) : 1000;

  useEffect(() => {
    // autoplay top carousel every 3s
    const t = setInterval(() => {
      setCarouselIndex(
        (i) => (i + 1) % Math.max(1, Math.min(5, rawHotels.length))
      );
    }, 3000);

    return () => clearInterval(t);
  }, [rawHotels.length]);

  // filtered + sorted hotels
  const hotels = useMemo(() => {
    let list = rawHotels.slice();

    if (minPrice !== "") list = list.filter((h) => h.price >= Number(minPrice));
    if (maxPrice !== "") list = list.filter((h) => h.price <= Number(maxPrice));

    if (sort === "stars_desc") list.sort((a, b) => b.stars - a.stars);
    else list.sort((a, b) => a.stars - b.stars);

    return list;
  }, [rawHotels, minPrice, maxPrice, sort]);

  const openModal = (hotel: Hotel, startIndex = 0) => {
    setModalHotel(hotel);
    setModalImageIndex(startIndex);
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Hotels in {key?.toUpperCase()}
      </h1>

      {/* Новая кнопка "Подробнее о стране" */}
      <div className="mb-4">
        <button
          onClick={() => alert(`Подробнее о стране: ${key?.toUpperCase()}`)}
          className="px-4 py-2 bg-[#ffb59e] text-white rounded-lg font-medium shadow hover:bg-[#ffa48a] transition"
        >
          Подробнее о стране
        </button>
      </div>

      {/* Top carousel (featured hotel images) */}
      <div className="mb-6 relative">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="w-full h-64 relative">
            {rawHotels.slice(0, 5).map((h, idx) => (
              <img
                key={h.name}
                src={h.images[0]}
                alt={h.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  idx === carouselIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}
            {rawHotels.length === 0 && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">No images</span>
              </div>
            )}
          </div>
        </div>

        {/* carousel controls */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            onClick={() =>
              setCarouselIndex(
                (i) =>
                  (i - 1 + Math.min(5, rawHotels.length)) %
                  Math.max(1, Math.min(5, rawHotels.length))
              )
            }
            className="bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
            aria-label="prev"
          >
            ◀
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            onClick={() =>
              setCarouselIndex(
                (i) => (i + 1) % Math.max(1, Math.min(5, rawHotels.length))
              )
            }
            className="bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
            aria-label="next"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Controls: filter + sort */}
      <div className="bg-white/5 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm">Price:</label>

          <input
            type="number"
            placeholder={`${globalMin}`}
            value={minPrice === "" ? "" : String(minPrice)}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24 p-2 rounded border bg-white/5"
            min={0}
          />

          <span>—</span>

          <input
            type="number"
            placeholder={`${globalMax}`}
            value={maxPrice === "" ? "" : String(maxPrice)}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-24 p-2 rounded border bg-white/5"
            min={0}
          />

          <button
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
            }}
            className="ml-3 px-3 py-2 rounded bg-gray-100 text-sm"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <label className="text-sm">Sort by stars:</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="p-2 rounded border bg-white/5"
          >
            <option value="stars_desc">Highest first</option>
            <option value="stars_asc">Lowest first</option>
          </select>
        </div>
      </div>

      {/* Grid: 4 columns x 2 rows */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        aria-live="polite"
      >
        {hotels.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            Нет отелей по фильтру
          </div>
        )}

        {hotels.map((hotel) => (
          <article
            key={hotel.name}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 duration-300"
          >
            <div
              className="h-48 lg:h-44 w-full cursor-pointer"
              onClick={() => openModal(hotel, 0)}
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">💰 {hotel.price} €</div>

                <div className="text-yellow-500 font-medium">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - hotel.stars }).map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openModal(hotel, 0)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View photos
                </button>

                <button
                  onClick={() =>
                    alert(`Бронирование: ${hotel.name} — ${hotel.price} €`)
                  }
                  className="px-3 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Book
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal gallery */}
      {modalOpen && modalHotel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={modalHotel.images[modalImageIndex]}
                alt={modalHotel.name}
                className="w-full h-96 object-cover"
              />

              <button
                onClick={() =>
                  setModalImageIndex(
                    (i) =>
                      (i - 1 + modalHotel.images.length) %
                      modalHotel.images.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ◀
              </button>

              <button
                onClick={() =>
                  setModalImageIndex((i) => (i + 1) % modalHotel.images.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ▶
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 bg-white/80 px-2 py-1 rounded"
                aria-label="close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{modalHotel.name}</h2>

              <div className="flex items-center justify-between mb-4">
                <div>💰 {modalHotel.price} €</div>

                <div className="text-yellow-500">
                  {Array.from({ length: modalHotel.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - modalHotel.stars }).map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {modalHotel.images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${modalHotel.name} ${idx}`}
                    onClick={() => setModalImageIndex(idx)}
                    className={`
                      w-24 h-16 object-cover rounded cursor-pointer border
                      ${
                        idx === modalImageIndex
                          ? "ring-2 ring-blue-500"
                          : "opacity-80"
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;
