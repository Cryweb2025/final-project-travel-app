import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { hotelsData, type Hotel } from "../services/data/hotelsData";
import { useTranslation } from "react-i18next";

const DestinationDetails: React.FC = () => {
  // Получение ключа страны из URL
  const { key } = useParams<{ key: string }>();

  // Хук для работы с переводами
  const { t } = useTranslation();

  // Список отелей для выбранной страны
  const rawHotels = hotelsData[key || ""] || [];

  /* ================= СОСТОЯНИЕ UI ================= */

  // Минимальная цена фильтра
  const [minPrice, setMinPrice] = useState<number | "">("");

  // Максимальная цена фильтра
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Тип сортировки по количеству звезд
  const [sort, setSort] = useState<"stars_desc" | "stars_asc">("stars_desc");

  // Индекс активного изображения в верхнем каруселе
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Флаг открытия модального окна
  const [modalOpen, setModalOpen] = useState(false);

  // Выбранный отель для просмотра галереи
  const [modalHotel, setModalHotel] = useState<Hotel | null>(null);

  // Индекс активного изображения в модальном окне
  const [modalImageIndex, setModalImageIndex] = useState(0);

  /* ================= ВСПОМОГАТЕЛЬНЫЕ ДАННЫЕ ================= */

  const prices = rawHotels.map((h) => h.price);
  const globalMin = prices.length ? Math.min(...prices) : 0;
  const globalMax = prices.length ? Math.max(...prices) : 1000;

  /* ================= ЭФФЕКТЫ ================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(
        (i) => (i + 1) % Math.max(1, Math.min(5, rawHotels.length))
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [rawHotels.length]);

  /* ================= ФИЛЬТРАЦИЯ И СОРТИРОВКА ================= */

  const hotels = useMemo(() => {
    let list = rawHotels.slice();

    if (minPrice !== "") list = list.filter((h) => h.price >= Number(minPrice));
    if (maxPrice !== "") list = list.filter((h) => h.price <= Number(maxPrice));

    list.sort((a, b) =>
      sort === "stars_desc" ? b.stars - a.stars : a.stars - b.stars
    );

    return list;
  }, [rawHotels, minPrice, maxPrice, sort]);

  const openModal = (hotel: Hotel, index = 0) => {
    setModalHotel(hotel);
    setModalImageIndex(index);
    setModalOpen(true);
  };

  /* ================= РЕНДЕР ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto text-slate-900 dark:text-slate-100">
      {/* Заголовок страницы */}
      <h1 className="text-3xl font-bold mb-4">
        {t("hotels.title", { country: key?.toUpperCase() })}
      </h1>

      {/* Кнопка "Подробнее о стране" */}
      <div className="mb-4">
        <button
          onClick={() =>
            alert(t("hotels.more_alert", { country: key?.toUpperCase() }))
          }
          className="
            inline-flex items-center justify-center
            px-5 py-2 rounded-lg
            text-sm font-semibold text-white
            bg-gradient-to-r from-sky-500 to-emerald-500
            shadow-md transition-all
            hover:from-sky-600 hover:to-emerald-600
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-sky-300
          "
        >
          {t("hotels.more")}
        </button>
      </div>

      {/* Верхний карусель изображений */}
      <div className="mb-6 relative">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="w-full h-64 relative">
            {rawHotels.slice(0, 5).map((h, idx) => (
              <img
                key={h.name}
                src={h.images[0]}
                alt={h.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  idx === carouselIndex ? "opacity-100" : "opacity-0 scale-105"
                }`}
              />
            ))}

            {rawHotels.length === 0 && (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <span className="text-slate-600 dark:text-slate-300">
                  {t("hotels.no_images")}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() =>
            setCarouselIndex(
              (i) =>
                (i - 1 + Math.min(5, rawHotels.length)) %
                Math.max(1, Math.min(5, rawHotels.length))
            )
          }
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full shadow"
        >
          ◀
        </button>

        <button
          onClick={() =>
            setCarouselIndex(
              (i) => (i + 1) % Math.max(1, Math.min(5, rawHotels.length))
            )
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full shadow"
        >
          ▶
        </button>
      </div>

      {/* Фильтры */}
      <div className="p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center bg-white dark:bg-slate-800 border dark:border-slate-700">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 w-full">
          <label className="text-sm sm:whitespace-nowrap">
            {t("hotels.price")}
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="number"
              placeholder={`${globalMin}`}
              value={minPrice === "" ? "" : minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full sm:w-24 p-2 rounded border dark:bg-slate-900 dark:border-slate-700"
            />

            <span className="text-slate-500">—</span>

            <input
              type="number"
              placeholder={`${globalMax}`}
              value={maxPrice === "" ? "" : maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full sm:w-24 p-2 rounded border dark:bg-slate-900 dark:border-slate-700"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
            }}
            className="
      w-full sm:w-auto
      px-4 py-2 text-sm font-semibold
      rounded-lg border
      dark:border-slate-600
      whitespace-nowrap
    "
          >
            {t("common.reset")}
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm">{t("hotels.sort_by_stars")}</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="p-2 rounded border dark:bg-slate-900 dark:border-slate-700"
          >
            <option value="stars_desc">{t("hotels.sort_high")}</option>
            <option value="stars_asc">{t("hotels.sort_low")}</option>
          </select>
        </div>
      </div>

      {/* Карточки отелей */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-12">
            {t("hotels.no_results")}
          </div>
        )}

        {hotels.map((hotel) => (
          <article
            key={hotel.name}
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden hover:scale-105 transition"
          >
            <div
              className="h-48 cursor-pointer"
              onClick={() => openModal(hotel)}
            >
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>

              <div className="flex justify-between text-sm">
                <span>💰 {hotel.price} €</span>
                <span className="text-yellow-500">
                  {"★".repeat(hotel.stars)}
                  <span className="text-slate-300 dark:text-slate-600">
                    {"★".repeat(5 - hotel.stars)}
                  </span>
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openModal(hotel)}
                  className="
    group relative flex-1 inline-flex items-center justify-center
    px-4 py-2
    rounded-lg
    text-sm font-semibold tracking-wide
    transition-all duration-300 ease-out

    /* LIGHT THEME */
    bg-gradient-to-r from-sky-500 to-blue-600
    text-white
    shadow-md shadow-sky-500/30
    hover:from-sky-600 hover:to-blue-700
    hover:shadow-lg hover:shadow-sky-600/40

    /* DARK THEME */
    dark:bg-gradient-to-r dark:from-sky-400 dark:to-blue-500
    dark:text-slate-900
    dark:shadow-cyan-400/30
    dark:hover:from-sky-300 dark:hover:to-blue-400
    dark:hover:shadow-cyan-300/40

    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-sm

    focus:outline-none
    focus:ring-2 focus:ring-sky-400
    focus:ring-offset-2 focus:ring-offset-transparent
  "
                >
                  {/* Glow layer */}
                  <span
                    className="
      pointer-events-none
      absolute inset-0 rounded-lg
      bg-white/30 dark:bg-white/20
      opacity-0 blur-md
      transition-opacity duration-300
      group-hover:opacity-100
    "
                  />

                  {/* Text */}
                  <span className="relative z-10">
                    {t("hotels.view_photos")}
                  </span>
                </button>

                <button
                  onClick={() =>
                    alert(
                      t("hotels.book_alert", {
                        hotel: hotel.name,
                        price: hotel.price,
                      })
                    )
                  }
                  className="
    group relative inline-flex items-center justify-center
    px-4 py-2
    rounded-lg
    text-sm font-semibold tracking-wide
    transition-all duration-300 ease-out

    /* LIGHT THEME */
    border border-sky-400/60
    text-sky-700
    bg-white
    hover:bg-sky-50
    hover:border-sky-500
    shadow-sm

    /* DARK THEME */
    dark:border-slate-600
    dark:text-slate-200
    dark:bg-slate-900/40
    dark:hover:bg-slate-800/60
    dark:hover:border-sky-400

    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-none

    focus:outline-none
    focus:ring-2 focus:ring-sky-400
    focus:ring-offset-2
    focus:ring-offset-transparent
  "
                >
                  {/* subtle glow */}
                  <span
                    className="
      pointer-events-none
      absolute inset-0 rounded-lg
      bg-sky-400/10 dark:bg-sky-400/10
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
                  />

                  <span className="relative z-10">{t("hotels.book")}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Модальное окно */}
      {modalOpen && modalHotel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full mx-4 overflow-hidden"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full"
              >
                ◀
              </button>

              <button
                onClick={() =>
                  setModalImageIndex((i) => (i + 1) % modalHotel.images.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 px-3 py-2 rounded-full"
              >
                ▶
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="p-4 flex gap-2 overflow-x-auto">
              {modalHotel.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${modalHotel.name} ${idx}`}
                  onClick={() => setModalImageIndex(idx)}
                  className={`w-24 h-16 object-cover rounded cursor-pointer border ${
                    idx === modalImageIndex
                      ? "ring-2 ring-sky-500"
                      : "opacity-70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetails;
