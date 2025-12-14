import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetWeatherQuery } from "../../services/api/weaterApi";

/*
  Пропсы карточки направления.
  name     — локализованное название страны
  image    — изображение направления
  city     — город для запроса погоды
  keyName  — ключ направления (используется в URL)
*/
interface DestinationCardProps {
  name: string;
  image: string;
  city: string;
  keyName: string;
}

/*
  Карточка направления.
  Отображает изображение страны, название и текущую погоду.
*/
const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  image,
  city,
  keyName,
}) => {
  // Хук переводов и текущего языка
  const { t, i18n } = useTranslation();

  /*
    Запрос погоды через RTK Query.
    В запрос передаётся:
    - город
    - текущий язык интерфейса (для локализованного описания погоды)
  */
  const { data, isLoading, error } = useGetWeatherQuery({
    city,
    lang: i18n.language,
  });

  return (
    /*
      Вся карточка является ссылкой на страницу деталей направления.
    */
    <Link
      to={`/destination/${keyName}`}
      className="
        group block w-full
        transition-transform duration-300
        hover:scale-[1.02]
      "
    >
      <div
        className="
          bg-yellow-100 rounded-xl overflow-hidden
          shadow-md hover:shadow-xl
          h-full
        "
      >
        {/* Изображение направления */}
        <img
          src={image}
          alt={name}
          className="
            w-full object-cover
            h-40 sm:h-44 md:h-48
            transition-transform duration-300
            group-hover:scale-105
          "
        />

        {/* Контент карточки */}
        <div className="p-4 flex flex-col items-center text-center gap-2">
          {/* Название страны */}
          <h3 className="text-base sm:text-lg font-semibold">{name}</h3>

          {/* Состояние загрузки погоды */}
          {isLoading && (
            <p className="text-xs sm:text-sm text-gray-600">
              ⏳ {t("weather.loading")}
            </p>
          )}

          {/* Ошибка загрузки погоды */}
          {error && (
            <p className="text-xs sm:text-sm text-red-500">
              ❌ {t("weather.failed")}
            </p>
          )}

          {/* Данные погоды */}
          {data?.weather?.[0] && (
            <div className="flex flex-col items-center gap-1">
              {/* Иконка погоды */}
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />

              {/* Температура и описание */}
              <p className="text-xs sm:text-sm font-medium">
                🌡️ {Math.round(data.main.temp)}°C •{" "}
                {data.weather[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
