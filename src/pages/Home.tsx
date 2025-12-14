import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  // Хук для работы с переводами
  const { t } = useTranslation();

  // Состояние поискового запроса
  const [query, setQuery] = useState("");

  // Навигация между страницами
  const navigate = useNavigate();

  // Обработчик поиска по введённому запросу
  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/destinations?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%", // Занимает всю доступную высоту контентной области
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Затемняющий слой поверх фонового изображения */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      />

      {/* Основной контент hero-секции */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        {/* Заголовок / слоган */}
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {t("slogan")}
        </h1>

        {/* Описательный текст */}
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          {t("hero_text")}
        </p>

        {/* Блок поиска направлений */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Поле ввода поискового запроса */}
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "0.8rem",
              width: "60%",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              outline: "none",
              fontSize: "1rem",
              background: "rgba(255,255,255,0.12)", // Полупрозрачный фон
              color: "#003049",
              backdropFilter: "blur(6px)", // Эффект стекла (glassmorphism)
            }}
          />

          {/* Кнопка запуска поиска */}
          <button
            onClick={handleSearch}
            style={{
              marginLeft: "1rem",
              padding: "0.8rem 1.5rem",
              background: "#0077b6",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#005f8f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0077b6")}
          >
            {t("search_button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
