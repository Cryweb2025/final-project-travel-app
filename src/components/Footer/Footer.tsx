import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

/*
  Компонент Footer.
  Отображает нижнюю часть сайта с социальными иконками
  и копирайтом. Поддерживает светлую и тёмную тему.
*/
const Footer: React.FC = () => {
  return (
    <footer
      className="
    bg-sky-700 dark:bg-slate-900
    text-white
    py-6
-   mt-auto
    border-t border-sky-600 dark:border-slate-800
  "
    >
      {/* Контейнер футера с ограничением по ширине */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        {/* ======================================================
           Блок социальных иконок
           Иконки ведут на внешние социальные сети
        ====================================================== */}
        <div className="flex items-center gap-6">
          {/* Twitter */}
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="
              text-white/90
              hover:text-sky-300 dark:hover:text-sky-400
              transition
            "
          >
            <Twitter size={22} />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="
              text-white/90
              hover:text-sky-300 dark:hover:text-sky-400
              transition
            "
          >
            <Facebook size={22} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="
              text-white/90
              hover:text-sky-300 dark:hover:text-sky-400
              transition
            "
          >
            <Instagram size={22} />
          </a>
        </div>

        {/* ======================================================
           Копирайт
           Год обновляется автоматически
        ====================================================== */}
        <div className="text-xs text-center text-white/70">
          © {new Date().getFullYear()} Travel App — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
