import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  login as loginAction,
  logout as logoutAction,
} from "../../slices/authSlice";
import { useTranslation } from "react-i18next";
import { Globe2, Menu, X, Sun, Moon } from "lucide-react";

// Логотип приложения
import Logo from "../../assets/images/logo.png";

// Контекст темы
import { useTheme } from "../../context/ThemeContext";

const Navbar: React.FC = () => {
  /* ------------------------------------------------------------------
     Получение состояния авторизации из Redux
     user === null → пользователь не авторизован
  ------------------------------------------------------------------ */
  const user = useSelector((state: RootState) => state.auth.user);

  // Redux dispatch
  const dispatch = useDispatch();

  // Навигация
  const navigate = useNavigate();

  // i18n
  const { t, i18n } = useTranslation();

  // Тема приложения (light / dark)
  const { theme, toggleTheme } = useTheme();

  // Состояние выпадающего списка языков
  const [langOpen, setLangOpen] = useState(false);

  // Состояние мобильного меню
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ------------------------------------------------------------------
     Синхронизация Redux-auth с localStorage при загрузке приложения.
     Если пользователь был залогинен ранее — он восстанавливается.
  ------------------------------------------------------------------ */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("logged_user");
      if (raw) {
        const parsed = JSON.parse(raw) as { email?: string };
        if (!user && parsed?.email) {
          dispatch(loginAction(parsed.email));
        }
      }
    } catch {
      // Ошибки парсинга игнорируются
    }
  }, [dispatch, user]);

  /* ------------------------------------------------------------------
     Смена языка интерфейса
  ------------------------------------------------------------------ */
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  // Базовые стили навигационных ссылок
  const linkBase =
    "px-3 py-2 text-sm font-medium rounded-md hover:bg-sky-600 hover:text-sky-50";

  const activeLink = "bg-sky-800 text-white";

  /* ------------------------------------------------------------------
     Выход из аккаунта:
     - очищает Redux
     - очищает localStorage
     - закрывает меню
     - SPA-переход на главную
  ------------------------------------------------------------------ */
  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("logged_user");

    setLangOpen(false);
    setMobileOpen(false);

    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-sky-700 dark:bg-slate-900 text-white shadow-md relative">
      <div className="px-3 sm:px-4">
        {/* Сетка: логотип | навигация | действия */}
        <div className="h-14 grid grid-cols-[auto,1fr,auto] items-center">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90"
            aria-label="Travel App"
            onClick={() => {
              setMobileOpen(false);
              setLangOpen(false);
            }}
          >
            <img
              src={Logo}
              alt="Travel App Logo"
              className="
    h-10 w-10 sm:h-12 sm:w-12 object-contain
    travel-logo-float
  "
              draggable={false}
            />
          </Link>

          {/* ============ CENTER NAV (desktop) ============ */}
          <div className="hidden md:flex justify-center">
            <div className="flex gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
              >
                {t("home")}
              </NavLink>

              <NavLink
                to="/destinations"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
              >
                {t("destinations")}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
              >
                {t("about")}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
              >
                {t("contact")}
              </NavLink>

              {/* Ссылка на профиль отображается только при авторизации */}
              {user && (
                <NavLink
                  to="/account"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeLink : ""}`
                  }
                >
                  {t("profile")}
                </NavLink>
              )}
            </div>
          </div>

          {/* ============ RIGHT BLOCK ============ */}
          <div className="flex items-center justify-end gap-2">
            {/* -------- Theme switcher -------- */}
            <button
              onClick={toggleTheme}
              className="
                inline-flex items-center justify-center
                rounded-md
                bg-white/90 dark:bg-slate-800
                text-sky-700 dark:text-slate-200
                p-2
                shadow-sm
                hover:bg-white dark:hover:bg-slate-700
                transition
              "
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* -------- Language switcher -------- */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen((v) => !v);
                  setMobileOpen(false);
                }}
                className="
                  inline-flex items-center gap-1
                  rounded-md
                  bg-white/90 dark:bg-slate-800
                  text-sky-700 dark:text-slate-200
                  px-2.5 py-1.5
                  text-sm font-medium
                  shadow-sm
                  hover:bg-white dark:hover:bg-slate-700
                "
              >
                <Globe2 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {i18n.language.split("-")[0].toUpperCase()}
                </span>
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 z-30 flex flex-col gap-1.5">
                  {[
                    { code: "de", label: "Deutsch", flag: "de" },
                    { code: "en", label: "English", flag: "gb" },
                    { code: "ru", label: "Русский", flag: "ru" },
                    { code: "uk", label: "Українська", flag: "ua" },
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className="
                        w-full text-left px-3 py-2 text-sm
                        flex items-center gap-2
                        rounded-md
                        bg-sky-700 dark:bg-slate-800
                        text-white
                        hover:bg-sky-500 dark:hover:bg-slate-700
                        shadow-sm transition
                      "
                    >
                      <img
                        src={`https://flagcdn.com/w20/${l.flag}.png`}
                        alt={l.code}
                        className="w-5 h-3 rounded-sm"
                      />
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* -------- Auth (desktop) -------- */}
            {user ? (
              <button
                onClick={handleLogout}
                className="
                  hidden md:inline-flex
                  rounded-md
                  bg-white dark:bg-slate-800
                  text-sky-700 dark:text-slate-200
                  px-3 py-1.5
                  text-sm font-semibold
                  hover:bg-sky-50 dark:hover:bg-slate-700
                "
              >
                {t("logout")}
              </button>
            ) : (
              <Link
                to="/login"
                className="
                  hidden md:inline-flex
                  rounded-md
                  bg-white dark:bg-slate-800
                  text-sky-700 dark:text-slate-200
                  px-4 py-1.5
                  text-sm font-semibold
                  hover:bg-sky-50 dark:hover:bg-slate-700
                "
              >
                {t("login")}
              </Link>
            )}

            {/* -------- Burger (mobile) -------- */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-sky-600 dark:hover:bg-slate-700"
              onClick={() => {
                setMobileOpen((v) => !v);
                setLangOpen(false);
              }}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-sky-700 dark:bg-slate-900 border-t border-sky-600 dark:border-slate-700 shadow-md z-20">
          <div className="px-3 py-2 flex flex-col gap-1">
            <NavLink
              to="/"
              end
              className={linkBase}
              onClick={() => setMobileOpen(false)}
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/destinations"
              className={linkBase}
              onClick={() => setMobileOpen(false)}
            >
              {t("destinations")}
            </NavLink>

            <NavLink
              to="/about"
              className={linkBase}
              onClick={() => setMobileOpen(false)}
            >
              {t("about")}
            </NavLink>

            <NavLink
              to="/contact"
              className={linkBase}
              onClick={() => setMobileOpen(false)}
            >
              {t("contact")}
            </NavLink>

            {user && (
              <NavLink
                to="/account"
                className={linkBase}
                onClick={() => setMobileOpen(false)}
              >
                {t("profile")}
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/login"
                className={linkBase}
                onClick={() => setMobileOpen(false)}
              >
                {t("login")}
              </NavLink>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className={`${linkBase} text-left`}
              >
                {t("logout")}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
