import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherResponse } from "../types/types";

/**
 * API-ключ OpenWeather.
 * Используется для запросов к сервису погоды.
 */
const apiKey = "3603bb385cba1812ea388450e7b58c94";

/**
 * Функция сопоставления языков сайта с языками OpenWeather.
 * i18n может возвращать сложные значения (например: en-US, de-DE),
 * поэтому используется приведение к базовому языку.
 */
const mapLangToOpenWeather = (lng: string) => {
  const base = (lng || "en").toLowerCase();

  // Явные соответствия поддерживаемых языков
  if (base.startsWith("uk")) return "uk";
  if (base.startsWith("ru")) return "ru";
  if (base.startsWith("de")) return "de";
  if (base.startsWith("en")) return "en";

  // Язык по умолчанию
  return "en";
};

/**
 * Аргументы запроса погоды.
 * city — город
 * lang — текущий язык интерфейса (i18n.language)
 */
type GetWeatherArgs = {
  city: string;
  lang: string;
};

/**
 * RTK Query API для работы с погодой.
 * Инкапсулирует запросы к OpenWeather.
 */
export const weatherApi = createApi({
  reducerPath: "weatherApi",

  /**
   * Базовая конфигурация HTTP-запросов.
   */
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),

  endpoints: (builder) => ({
    /**
     * Запрос текущей погоды по городу.
     * Язык описания погоды автоматически подстраивается
     * под текущий язык сайта.
     */
    getWeather: builder.query<WeatherResponse, GetWeatherArgs>({
      query: ({ city, lang }) => {
        const owLang = mapLangToOpenWeather(lang);

        return `weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=${owLang}`;
      },
    }),
  }),
});

// Хук для использования запроса погоды в компонентах
export const { useGetWeatherQuery } = weatherApi;
