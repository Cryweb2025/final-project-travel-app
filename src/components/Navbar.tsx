import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { logout } from "../slices/authSlice";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#0077b6",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Logo */}
      <h2>Travel App</h2>

      {/* Navigation Links */}
      <div>
        <Link to="/" style={{ margin: "0 1rem", color: "white" }}>
          {t("home")}
        </Link>
        <Link to="/destinations" style={{ margin: "0 1rem", color: "white" }}>
          {t("destinations")}
        </Link>
      </div>

      {/* Rechts: Sprache + Login/Logout */}
      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        {/* Sprachmenü Button */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "white",
            color: "#0077b6",
            padding: "0.3rem 0.6rem",
            borderRadius: "4px",
            marginRight: "1rem",
          }}
        >
          🌐
        </button>

        {/* Minifenster mit Flaggen */}
        {open && (
          <div
            style={{
              position: "absolute",
              top: "2.5rem",
              right: "3rem",
              background: "white",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              padding: "0.5rem",
              display: "flex",
              gap: "0.5rem",
              zIndex: 1000,
            }}
          >
            <button onClick={() => changeLanguage("de")}>DE</button>
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("ru")}>RU</button>
            <button onClick={() => changeLanguage("uk")}>UA</button>
          </div>
        )}

        {/* Login/Logout */}
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>👋 {user}</span>
            <button
              onClick={() => dispatch(logout())}
              style={{
                background: "white",
                color: "#0077b6",
                padding: "0.3rem 0.6rem",
                borderRadius: "4px",
              }}
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <Link
            to="/login"
            style={{
              background: "white",
              color: "#0077b6",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            {t("login")}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
