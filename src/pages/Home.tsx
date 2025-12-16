import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReviewsCarousel from "../components/ReviewsCarousel/ReviewsCarousel";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  // Компонент получает функцию переводов из i18n.
  const { t } = useTranslation();

  // Компонент хранит состояние поискового запроса.
  const [query, setQuery] = useState("");

  // Компонент получает функцию навигации между страницами.
  const navigate = useNavigate();

  // Компонент выполняет переход на страницу направлений с параметром поиска.
  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/destinations?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    /**
     * Компонент занимает 100% высоты main-контейнера,
     * который уже “учёл” Navbar и Footer на уровне App.tsx.
     */
    <section
      className={`
        relative
        w-full h-full
        flex items-center justify-center
        text-center
        overflow-hidden
        text-white
        ${styles.heroSection}
      `}
    >
      {/* Компонент рисует затемняющий слой поверх фонового изображения. */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-0" />

      {/* Компонент отображает основной hero-контент по центру. */}
      <div className="relative z-10 max-w-3xl px-4">
        {/* Компонент выводит главный слоган. */}
        <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
          {t("slogan")}
        </h1>

        {/* Компонент выводит подзаголовок hero-секции. */}
        <p className="mt-4 text-base sm:text-lg text-white/90 drop-shadow">
          {t("hero_text")}
        </p>

        {/* Компонент отображает поиск: input + кнопка. */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full sm:w-[60%]
              px-4 py-3
              rounded-xl
              bg-white/20 dark:bg-slate-900/40
              border border-white/30 dark:border-slate-600
              backdrop-blur-md
              text-white placeholder-white/70
              focus:ring-2 focus:ring-sky-400
              transition
            "
          />

          <button
            onClick={handleSearch}
            className="
    group relative inline-flex items-center justify-center
    px-7 py-3
    rounded-xl
    font-semibold tracking-wide
    transition-all duration-300 ease-out

    /* LIGHT THEME */
    bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600
    text-white
    shadow-lg shadow-sky-500/30
    hover:from-sky-600 hover:via-cyan-600 hover:to-blue-700
    hover:shadow-xl hover:shadow-sky-600/40

    /* DARK THEME */
    dark:bg-gradient-to-r dark:from-sky-400 dark:via-cyan-400 dark:to-blue-500
    dark:text-slate-900
    dark:shadow-cyan-400/30
    dark:hover:from-sky-300 dark:hover:via-cyan-300 dark:hover:to-blue-400
    dark:hover:shadow-cyan-300/40

    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-md

    focus:outline-none
    focus:ring-2 focus:ring-sky-400
    focus:ring-offset-2
    focus:ring-offset-transparent
  "
          >
            {/* Glow / glass слой */}
            <span
              className="
      pointer-events-none
      absolute inset-0 rounded-xl
      bg-white/30 dark:bg-white/20
      opacity-0 blur-md
      transition-opacity duration-300
      group-hover:opacity-100
    "
            />

            {/* Текст */}
            <span className="relative z-10">{t("search_button")}</span>
          </button>
        </div>
      </div>

      {/* Компонент размещает отзывы поверх картинки у нижнего края hero. */}
      <div
        className="
          absolute
          bottom-14 sm:bottom-16 lg:bottom-4
          left-1/2 -translate-x-1/2
          w-full px-4
          z-20
          pointer-events-auto
        "
      >
        <ReviewsCarousel />
      </div>
    </section>
  );
};

export default Home;
