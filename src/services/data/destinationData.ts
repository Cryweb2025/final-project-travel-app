/*
  Описание структуры направления.
  Используется для типизации списка направлений.
*/
export interface Destination {
  key: string;
  image: string;
  city: string;
}

/*
  Список доступных направлений для страницы Destinations.
  Данные вынесены отдельно для удобства поддержки и масштабирования.
*/
export const destinationsData: Destination[] = [
  {
    key: "japan",
    image:
      "https://image.urlaubspiraten.de/1024/image/upload/v1603291907/mediavault_images/vfxxikyprxdxs8gbwpur.jpg",
    city: "Tokyo",
  },
  {
    key: "mexico",
    image:
      "https://cdn.urlaubsguru.at/wp-content/uploads/2022/09/Bacalar-Lake-at-caribbean-Quintana-Roo-Mexico-Rivier-Maya-iStock_000057563734_1920x1280.jpg",
    city: "Mexico City",
  },
  {
    key: "uae",
    image:
      "https://rgairan.com/upload/articles/small/376025721dubai-best-time-to-travel.jpg",
    city: "Dubai",
  },
  {
    key: "turkey",
    image:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1vk1XU.img?w=2048&h=1046&m=4&q=72",
    city: "Istanbul",
  },
  {
    key: "maldives",
    image:
      "https://www.luxurylifestylemag.co.uk/wp-content/uploads/2018/12/Huvafen_Spa_OutdoorTreatment-14.jpg",
    city: "Male",
  },
  {
    key: "spain",
    image:
      "https://cdn.urlaubsguru.de/wp-content/uploads/2025/02/mallorca_RID_35_shutterstock_2200357503.jpg",
    city: "Madrid",
  },
  {
    key: "greece",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.JlA45AN3jiilGUH8eNKXFAHaFD?rs=1&pid=ImgDetMain&o=7&rm=3",
    city: "Athens",
  },
  {
    key: "italy",
    image:
      "https://www.costakreuzfahrten.de/content/dam/costa/costa-magazine/articles-magazine/beaches/italy-beaches/italia-spiaggie_m.jpg.image.694.390.low.jpg",
    city: "Rome",
  },
  {
    key: "france",
    image:
      "https://www.ferienhausmiete.de/blog/resources/uploads/Calaqnues-wasser-1200x800.jpg",
    city: "Paris",
  },
];
