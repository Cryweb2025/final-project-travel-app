import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import DestinationCard from "../components/DestinationCard/DestinationCard";
import { destinationsData } from "../services/data/destinationData";

/*
  Страница Destinations.
  Отображает список направлений с учётом поиска из URL.
*/
const Destinations: React.FC = () => {
  // Хук перевода
  const { t } = useTranslation();

  // Текущий URL для чтения query-параметров
  const location = useLocation();

  /* ---------------- ПОИСК ---------------- */

  // Извлечение параметра ?search из адресной строки
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  /* ---------------- ФИЛЬТРАЦИЯ ---------------- */

  // Фильтрация направлений по переведённому названию страны
  const filtered = destinationsData.filter((d) =>
    t(`destinations_list.${d.key}`).toLowerCase().includes(search)
  );

  /* ================== RENDER ================== */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Заголовок страницы */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        {t("destinations")}
      </h1>

      {/* Сетка карточек направлений */}
      {filtered.length > 0 ? (
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {filtered.map((d) => (
            <DestinationCard
              key={d.key}
              keyName={d.key}
              name={t(`destinations_list.${d.key}`)}
              image={d.image}
              city={d.city}
            />
          ))}
        </div>
      ) : (
        // Сообщение, если ничего не найдено
        <p className="text-center text-gray-500 mt-12">{t("no_results")}</p>
      )}
    </div>
  );
};

export default Destinations;
