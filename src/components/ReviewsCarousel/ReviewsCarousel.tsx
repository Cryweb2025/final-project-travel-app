import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { reviews } from "../../services/data/reviews";

/**
 * Компонент ReviewsCarousel.
 * Отображает карусель отзывов (с авто-переключением и ручными кнопками).
 * Поддерживает i18n и светлую/тёмную тему (через dark: классы Tailwind).
 */
const ReviewsCarousel: React.FC = () => {
  // Компонент получает функцию перевода из i18n.
  const { t } = useTranslation();

  // Компонент хранит индекс текущего отзыва.
  const [index, setIndex] = useState(0);

  /**
   * Компонент запускает авто-переключение отзывов.
   * Каждые 5 секунд индекс увеличивается, а при достижении конца — начинается с 0.
   * Таймер очищается при размонтировании, чтобы не было утечек.
   */
  useEffect(() => {
    // Компонент защищается от случая, когда массив отзывов пустой.
    if (!reviews?.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Компонент переключает отзыв на предыдущий с корректным циклическим переходом.
  const prev = () => {
    if (!reviews?.length) return;
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Компонент переключает отзыв на следующий с корректным циклическим переходом.
  const next = () => {
    if (!reviews?.length) return;
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  // Компонент выбирает текущий отзыв (если индекс вдруг вышел за пределы — берётся 0).
  const safeIndex = reviews?.length ? index % reviews.length : 0;
  const review = reviews?.length ? reviews[safeIndex] : null;

  // Компонент показывает заглушку, если отзывов нет (чтобы не падать).
  if (!review) {
    return null;
  }

  return (
    /**
     * Компонент делает внешний контейнер без "mt-16",
     * чтобы он был безопасен при absolute-позиционировании в Hero:
     * расстояние до низа контролируется родителем (например bottom-*).
     */
    <div className="max-w-3xl mx-auto text-center px-4">
      {/* Компонент показывает заголовок секции отзывов. */}
      <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow">
        {t("reviews.title")}
      </h2>

      {/* Карточка отзыва с glassmorphism-стилем и поддержкой dark mode. */}
      <div
        className="
          relative mt-6
          rounded-2xl
          border border-white/20
          bg-white/20 dark:bg-slate-900/40
          backdrop-blur-lg
          p-6 sm:p-8
          text-white
          shadow-xl shadow-black/20
        "
      >
        {/* Компонент выводит текст отзыва через i18n ключ. */}
        <p className="text-sm sm:text-base italic text-white/90">
          “{t(review.textKey)}”
        </p>

        {/* Компонент рисует рейтинг звёздами (1–5). */}
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Компонент отображает автора и страну/город. */}
        <div className="mt-3 text-xs sm:text-sm text-white/80">
          <span className="font-semibold">{review.name}</span> ·{" "}
          {review.country}
        </div>

        {/* Компонент показывает кнопку "назад". */}
        <button
          type="button"
          onClick={prev}
          className="
            absolute left-3 top-1/2 -translate-y-1/2
            p-2 rounded-full
            bg-black/30 hover:bg-black/50
            transition
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
            focus:ring-offset-transparent
          "
          aria-label={t("reviews.prev")}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Компонент показывает кнопку "вперёд". */}
        <button
          type="button"
          onClick={next}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            p-2 rounded-full
            bg-black/30 hover:bg-black/50
            transition
            focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
            focus:ring-offset-transparent
          "
          aria-label={t("reviews.next")}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
