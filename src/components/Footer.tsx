import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react"; // → реальные соц. иконки

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-700 text-white py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-6 text-2xl">
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
          >
            <Twitter size={24} />
          </a>

          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
          >
            <Facebook size={24} />
          </a>

          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition"
          >
            <Instagram size={24} />
          </a>
        </div>

        {/* Copyright — по центру */}
        <div className="text-xs text-center opacity-80">
          © {new Date().getFullYear()} Travel App — All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
