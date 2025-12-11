import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        background: "#0077b6",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Link unten links */}
      <div>
        <Link to="/about" style={{ margin: "0 1rem", color: "white" }}>
          {t("about")}
        </Link>
      </div>

      {/* Social Media Icons + Copyright rechts */}
      <div style={{ textAlign: "right" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem", color: "white", fontSize: "1.5rem" }}>
            🐦
          </a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem", color: "white", fontSize: "1.5rem" }}>
            📘
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" style={{ margin: "0 0.5rem", color: "white", fontSize: "1.5rem" }}>
            📸
          </a>
        </div>
        <div>© {new Date().getFullYear()} Travel App – All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;


