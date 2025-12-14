export type Hotel = {
  name: string;
  price: number;
  stars: number;
  images: string[];
};

export const hotelsData: Record<string, Hotel[]> = {
  japan: [
    {
      name: "Tokyo Bay Hilton",
      price: 180,
      stars: 5,
      images: [
        "https://www.hilton.com/im/en/TYOTBTW/18387646/exe-room-11-.jpg?impolicy=crop&cw=4498&ch=2998&gravity=NorthWest&xposition=0&yposition=0&rw=1280&rh=854",
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
        "https://hyatt-regency-osaka.hotels-in-osaka.com/data/Photos/OriginalPhoto/14555/1455584/1455584323/osaka-grand-prince-hotel-osaka-bay-photo-76.JPEG",
      ],
    },
    {
      name: "Kyoto Royal Palace Hotel",
      price: 160,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
        "https://media-cdn.holidaycheck.com/w_768,h_432,c_fill,q_auto,f_auto/ugc/images/af04c1b2-a37f-4b8c-b7e4-6d95585f8238",
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
        "https://www.datocms-assets.com/101439/1739103917-highland-resort-hotel-spa.jpg?auto=format&h=1000&w=2000",
        "https://cdn.jumeirah.com/api/public/content/79da328fb1394fe1a4e9fdd3c5726301?v=edf1e992",
      ],
    },
    {
      name: "Osaka Bay Hotel",
      price: 110,
      stars: 4,
      images: [
        "https://osaka-bay-tower.hotels-in-osaka.com/data/Pics/OriginalPhoto/16065/1606598/1606598253/art-hotel-osaka-bay-tower-osaka-pic-1.JPEG",
        "https://hyatt-regency-osaka.hotels-in-osaka.com/data/Photos/OriginalPhoto/14555/1455584/1455584323/osaka-grand-prince-hotel-osaka-bay-photo-76.JPEG",
      ],
    },
    {
      name: "Imperial Tokyo Inn",
      price: 100,
      stars: 3,
      images: [
        "https://www.hilton.com/im/en/TYOTBTW/18387646/exe-room-11-.jpg?impolicy=crop&cw=4498&ch=2998&gravity=NorthWest&xposition=0&yposition=0&rw=1280&rh=854",
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
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/484892426.jpg?k=180f0627afa884090150863ba592ed2857c6580b2ca0f0fc28dd5d11fe8d5ca1&o=&hp=1",
        "https://www.hilton.com/im/en/TYOTBTW/18387646/exe-room-11-.jpg?impolicy=crop&cw=4498&ch=2998&gravity=NorthWest&xposition=0&yposition=0&rw=1280&rh=854",
      ],
    },
    {
      name: "Maya Palace Spa Hotel",
      price: 180,
      stars: 4,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/316159544.jpg?k=b2d56282a9167f456845e8fda134146052e3c5e768782aa4083a270dc19c2fd7&o=",
      ],
    },
    {
      name: "Tulum Oceanfront",
      price: 250,
      stars: 5,
      images: [
        "https://images.squarespace-cdn.com/content/v1/5ef989171950e30ec632f2f1/3dad690b-e1a1-47f9-ae72-a256ca68e9aa/olas-tulum-mexico-hotel-oceanfront-junior-suite.jpg",
        "https://cdn.jumeirah.com/api/public/content/79da328fb1394fe1a4e9fdd3c5726301?v=edf1e992",
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
        "https://royal-palace.hotelsnicosia.com/data/Pics/OriginalPhoto/16093/1609367/1609367072/royal-palace-hotel-nicosia-pic-1.JPEG",
      ],
    },
    {
      name: "Baja California Resort",
      price: 260,
      stars: 5,
      images: [
        "https://images.squarespace-cdn.com/content/6250a8d257a6e83aaad50c8e/1725157964442-0QS1NKEY5D96T3XBADI9/best-hotels-baja-california.jpg?content-type=image%2Fjpeg",
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
        "https://www.sonikstour.ru/upload/resize_cache/webp/iblock/66a/66ab595f77c758d0f769190911d2835f.webp",
      ],
    },
    {
      name: "Dubai Marina Hotel",
      price: 240,
      stars: 4,
      images: ["https://hotels.sletat.ru/i/f/85087_0.jpg"],
    },
    {
      name: "Palm Jumeirah Luxury Suites",
      price: 420,
      stars: 5,
      images: [
        "https://www.exoticadubai.tajhotels.com/wp-content/uploads/sites/470/2025/08/Luxury-Suite-Sea-View-4-2000x1000.jpg",
      ],
    },
    {
      name: "Abu Dhabi Seaside Hotel",
      price: 210,
      stars: 4,
      images: [
        "https://static21.com-hotel.com/uploads/hotel/78902/photo/the-st-regis-abu-dhabi_155074475910.jpg",
      ],
    },
    {
      name: "Desert Oasis Resort",
      price: 190,
      stars: 4,
      images: [
        "https://sheraton-desert-oasis.hotels-scottsdale.com/data/Imgs/OriginalPhoto/3115/311590/311590605/img-sheraton-desert-oasis-villas-scottsdale-scottsdale-31.JPEG",
      ],
    },
    {
      name: "Dubai Crown Plaza",
      price: 150,
      stars: 3,
      images: ["https://www.intrust-tour.ru/images/hotel_img/hotel_11131.jpg"],
    },
    {
      name: "Golden Sand Palace",
      price: 250,
      stars: 5,
      images: [
        "https://files.anextour.ru/hotel/uae/hotel/golden-sands-hotel-apartment-5-dubai/o249069?&hotelCode=17591",
      ],
    },
    {
      name: "Skyline Boutique",
      price: 210,
      stars: 5,
      images: [
        "https://media.architonic.com/p-on/20268141/content/sumei-skyline-coast-boutique-hotel_content_c6083a9d.jpeg",
      ],
    },
  ],

  turkey: [
    {
      name: "Istanbul Bosphorus Hotel",
      price: 130,
      stars: 4,
      images: [
        "https://www.clickistanbulhotels.com/data/Photos/OriginalPhoto/12748/1274872/1274872306.JPEG",
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
        "https://www.sultancavesuites.com/uploads/2020/06/308-01-2_op.jpg",
      ],
    },
    {
      name: "Izmir Marina Suites",
      price: 120,
      stars: 3,
      images: ["https://hotelephesus.com/wp-content/uploads/2025/07/6-1-1.jpg"],
    },
    {
      name: "Bodrum Luxury Villa",
      price: 230,
      stars: 5,
      images: [
        "https://lujohotel.com/assets/rooms/maki-villa-two-bedroom-partly/1.jpg",
      ],
    },
    {
      name: "Ankara Central Hotel",
      price: 100,
      stars: 3,
      images: [
        "https://hyatt-regency-osaka.hotels-in-osaka.com/data/Photos/OriginalPhoto/14555/1455584/1455584323/osaka-grand-prince-hotel-osaka-bay-photo-76.JPEG",
      ],
    },
    {
      name: "Ephesus Grand Resort",
      price: 160,
      stars: 4,
      images: ["https://hotelephesus.com/wp-content/uploads/2025/07/6-1-1.jpg"],
    },
    {
      name: "Bosphorus Palace",
      price: 180,
      stars: 5,
      images: [
        "https://images.trvl-media.com/lodging/1000000/530000/528600/528546/d5fc7394.jpg?impolicy=fcrop&w=1200&h=800&quality=medium",
      ],
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
        "https://static.independent.co.uk/2025/07/21/12/23/wh-bcnwh-w-barcelona-24004.jpeg",
      ],
    },
    {
      name: "Madrid Royal Suites",
      price: 190,
      stars: 5,
      images: [
        "https://sharetribe.imgix.net/6623df02-4af4-48a8-a977-c25cf75728b7/662666cd-8127-4118-87ea-1da3a9d73e49?auto=format&fit=clip&h=2400&w=2400&s=b3a7679abf37d5894e4a654329f377c2",
      ],
    },
    {
      name: "Seville Andalusia Resort",
      price: 140,
      stars: 4,
      images: [
        "https://themediterraneaninsider.com/wp-content/uploads/2025/04/TMI_HotelAlfonsoXIII_Seville_Andalusia_Spain_03_.jpg",
      ],
    },
    {
      name: "Valencia Sun Hotel",
      price: 120,
      stars: 3,
      images: ["https://cdn2.paraty.es/seayou-valencia/images/196b8efcf33d55b"],
    },
    {
      name: "Ibiza Paradise Club",
      price: 260,
      stars: 5,
      images: [
        "https://bynder.onthebeach.co.uk/cdn-cgi/image/width=1400,quality=70,fit=cover,format=auto/m/1eeaac274a178f8e/original/Crown-Paradise-Cancun.jpg",
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
        "https://images.squarespace-cdn.com/content/v1/63d83cafb5d75a62ec607e07/ef7377df-585d-4bc9-be1a-6e087e4c2428/Best+Hotels+in+Rome+with+a+View+-+NH+Collection+Roma+Fori+Imperiali.jpg",
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
        "https://www.hotel-florence.net/data/Photos/OriginalPhoto/8053/805394/805394283.JPEG",
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
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/78/6f/74/panoramica-piscina.jpg?w=900&h=500&s=1",
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
