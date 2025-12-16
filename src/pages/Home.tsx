import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReviewsCarousel from "../components/ReviewsCarousel/ReviewsCarousel";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/destinations?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section
      className="
        relative w-full h-full
        flex items-center justify-center
        text-center
        overflow-hidden text-white
        px-4 sm:px-0
      "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Темный оверлей */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50 z-0" />

      {/* Контент */}
      <div
        className="
          relative z-10 max-w-3xl w-full
          pb-24 sm:pb-0  /* только на мобилке отступ снизу */
        "
      >
        {/* Заголовок */}
        <h1
          className="
            text-xl sm:text-3xl
            font-bold drop-shadow-md leading-snug
          "
        >
          {t("slogan")}
        </h1>

        <p
          className="
            mt-3 text-sm sm:text-lg
            text-white/90 drop-shadow-sm
          "
        >
          {t("hero_text")}
        </p>

        {/* Форма поиска */}
        <div
          className="
            mt-8
            flex flex-col sm:flex-row
            items-stretch sm:items-center
            justify-center gap-3 sm:gap-4
          "
        >
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full sm:w-[60%]
              px-4 py-2.5 sm:py-3
              rounded-xl
              bg-white/20 dark:bg-slate-900/40
              border border-white/30 dark:border-slate-600
              backdrop-blur-md
              text-white placeholder-white/70
              focus:ring-2 focus:ring-sky-400
              text-sm sm:text-base
              transition
            "
          />

          <button
            onClick={handleSearch}
            className="
              relative inline-flex items-center justify-center
              px-6 py-2.5 sm:px-7 sm:py-3
              rounded-xl font-semibold text-sm sm:text-base
              tracking-wide transition-all duration-300 ease-out
              bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600
              text-white shadow-lg shadow-sky-500/30
              hover:from-sky-600 hover:via-cyan-600 hover:to-blue-700
              hover:shadow-xl hover:shadow-sky-600/40
              dark:from-sky-400 dark:via-cyan-400 dark:to-blue-500
              dark:text-slate-900 dark:shadow-cyan-400/30
              dark:hover:from-sky-300 dark:hover:via-cyan-300 dark:hover:to-blue-400
              dark:hover:shadow-cyan-300/40
              hover:-translate-y-0.5 active:translate-y-0 active:shadow-md
              focus:outline-none
              focus:ring-2 focus:ring-sky-400
              focus:ring-offset-2 focus:ring-offset-transparent
            "
          >
            <span
              className="
                pointer-events-none absolute inset-0 rounded-xl
                bg-white/30 dark:bg-white/20
                opacity-0 blur-md transition-opacity duration-300
                group-hover:opacity-100
              "
            />
            <span className="relative z-10">{t("search_button")}</span>
          </button>
        </div>
      </div>

      {/* Отзывы */}
      <div
        className="
          absolute
          bottom-2 sm:bottom-4  /* На мобилке — выше, на desktop — ниже */
          left-1/2 -translate-x-1/2
          w-full max-w-lg px-4
          z-20 pointer-events-auto
        "
      >
        <ReviewsCarousel />
      </div>
    </section>
  );
};

export default Home;
