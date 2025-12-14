import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

/*
  Компонент Footer.
  Отображает нижнюю часть сайта с социальными иконками
  и копирайтом, выровненными по центру.
*/
const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-700 text-white py-6 mt-auto">
      {/* Контейнер футера с ограничением по ширине */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-2">
        {/* Блок социальных иконок */}
        <div className="flex items-center gap-6 text-2xl">
          {/* Twitter */}
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
            aria-label="Twitter"
          >
            <Twitter size={24} />
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
        </div>

        {/* Копирайт, автоматически обновляющий год */}
        <div className="text-xs text-center opacity-80">
          © {new Date().getFullYear()} Travel App — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
