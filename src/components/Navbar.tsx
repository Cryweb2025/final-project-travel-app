import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../slices/authSlice";
import { useTranslation } from "react-i18next";
import { Globe2, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const linkBase =
    "px-3 py-2 text-sm font-medium rounded-md hover:bg-sky-600 hover:text-sky-50";
  const activeLink = "bg-sky-800 text-white";

  return (
    <nav className="bg-sky-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Лого + ссылки (desktop) */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-lg font-semibold tracking-wide hover:opacity-90"
            >
              Travel App
            </Link>

            <div className="hidden md:flex gap-1">
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
            </div>
          </div>

          {/* Правый блок: языки + auth + бургер */}
          <div className="flex items-center gap-2">
            {/* Языки */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="inline-flex items-center gap-1 rounded-md bg-white/90 text-sky-700 px-2.5 py-1.5 text-sm font-medium shadow-sm hover:bg-white"
              >
                <Globe2 className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {i18n.language.toUpperCase()}
                </span>
              </button>

              {langOpen && (
                <div
                  className="
                    absolute right-0 mt-2 w-40 
                    bg-transparent 
                    z-30 
                    flex flex-col gap-1.5
                  "
                >
                  {/* Deutsch */}
                  <button
                    className="
                      w-full text-left px-3 py-2 text-sm 
                      flex items-center gap-2 
                      rounded-md 
                      bg-sky-700/95 text-white 
                      hover:bg-sky-500 
                      shadow-sm 
                      transition
                    "
                    onClick={() => changeLanguage("de")}
                  >
                    <img
                      src="https://flagcdn.com/w20/de.png"
                      alt="DE"
                      className="w-5 h-3 rounded-sm"
                    />
                    <span>Deutsch</span>
                  </button>

                  {/* English */}
                  <button
                    className="
                      w-full text-left px-3 py-2 text-sm 
                      flex items-center gap-2 
                      rounded-md 
                      bg-sky-700/95 text-white 
                      hover:bg-sky-500 
                      shadow-sm 
                      transition
                    "
                    onClick={() => changeLanguage("en")}
                  >
                    <img
                      src="https://flagcdn.com/w20/gb.png"
                      alt="EN"
                      className="w-5 h-3 rounded-sm"
                    />
                    <span>English</span>
                  </button>

                  {/* Русский */}
                  <button
                    className="
                      w-full text-left px-3 py-2 text-sm 
                      flex items-center gap-2 
                      rounded-md 
                      bg-sky-700/95 text-white 
                      hover:bg-sky-500 
                      shadow-sm 
                      transition
                    "
                    onClick={() => changeLanguage("ru")}
                  >
                    <img
                      src="https://flagcdn.com/w20/ru.png"
                      alt="RU"
                      className="w-5 h-3 rounded-sm"
                    />
                    <span>Русский</span>
                  </button>

                  {/* Українська */}
                  <button
                    className="
                      w-full text-left px-3 py-2 text-sm 
                      flex items-center gap-2 
                      rounded-md 
                      bg-sky-700/95 text-white 
                      hover:bg-sky-500 
                      shadow-sm 
                      transition
                    "
                    onClick={() => changeLanguage("uk")}
                  >
                    <img
                      src="https://flagcdn.com/w20/ua.png"
                      alt="UA"
                      className="w-5 h-3 rounded-sm"
                    />
                    <span>Українська</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth (desktop) */}
            {user ? (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="opacity-90 max-w-[120px] truncate">
                  👋 {user}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="rounded-md bg-white text-sky-700 px-3 py-1.5 text-sm font-semibold hover:bg-sky-50"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center justify-center rounded-md bg-white text-sky-700 px-4 py-1.5 text-sm font-semibold hover:bg-sky-50"
              >
                {t("login")}
              </Link>
            )}

            {/* Бургер (mobile) */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 border-t border-sky-600">
            <div className="pt-2 flex flex-col gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {t("home")}
              </NavLink>
              <NavLink
                to="/destinations"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {t("destinations")}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {t("about")}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeLink : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {t("contact")}
              </NavLink>

              {user ? (
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileOpen(false);
                  }}
                  className={`${linkBase} text-left`}
                >
                  {t("logout")}
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeLink : ""}`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t("login")}
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
