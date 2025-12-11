import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { logout } from "../slices/authSlice";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <nav style={{ padding: "1rem", background: "#0077b6", color: "white", display: "flex", justifyContent: "space-between" }}>
      <h2>Travel App</h2>
      <div>
        <Link to="/" style={{ margin: "0 1rem", color: "white" }}>{t("home")}</Link>
        <Link to="/destinations" style={{ margin: "0 1rem", color: "white" }}>{t("destinations")}</Link>
        <Link to="/about" style={{ margin: "0 1rem", color: "white" }}>{t("about")}</Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <button onClick={() => changeLanguage("de")}>🇩🇪</button>
          <button onClick={() => changeLanguage("en")}>🇬🇧</button>
          <button onClick={() => changeLanguage("ru")}>🇷🇺</button>
          <button onClick={() => changeLanguage("uk")}>🇺🇦</button>
        </div>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "1rem" }}>👋 {user}</span>
              <button onClick={() => dispatch(logout())}>{t("logout")}</button>
            </>
          ) : (
            <Link to="/login" style={{ background: "white", color: "#0077b6", padding: "0.5rem 1rem", borderRadius: "4px" }}>
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


