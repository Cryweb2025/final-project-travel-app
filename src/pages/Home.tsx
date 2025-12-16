import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
      style={{
        position: "relative",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      {/* Overlay für bessere Lesbarkeit */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>

      {/* Inhalt */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{t("slogan")}</h1>
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          {t("hero_text")}
        </p>

        {/* Suchfeld */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "0.8rem",
              width: "60%",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
            }}
          />
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
            }}
          >
            {t("search_button")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
