# 🌍 Travel App — React + Redux Travel Platform

![logo-head-git](https://github.com/user-attachments/assets/8785c60d-8a15-4b9a-982b-e803a9e023c0)


---
## [Vercel](https://final-project-travel-app.vercel.app/)
## [Figma](https://www.figma.com/design/7q1wHPuiwNSCkuieGebqBD/Travel-App-Main-Design?node-id=0-1&p=f&t=2sYhPLmcWASjbTRE-0)
---

## 🇬🇧 English

### 📌 Project Overview

**Travel App** is a modern multi-language travel platform built with **React**, **TypeScript**, and **Redux Toolkit**.
The application enables users to explore travel destinations, view hotels, check real-time weather, and manage their user accounts through authentication.

The project demonstrates clean architecture, scalable state management, and real-world front-end practices.

### 🚀 Features

- 🌐 Multi-language support (EN / DE / RU / UA)
- 🔐 User authentication (register / login/logout)
- 🧭 Destination browsing with search
- 🏨 Hotel listings with filters and sorting
- 🌦️ Real-time weather (OpenWeather API)
- 📱 Fully responsive design
- 🧠 State management with Redux Toolkit
- ⚡ API handling via RTK Query
- 💾 LocalStorage persistence
- 🎨 Modern UI with Tailwind CSS

### 🛠️ Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- React Router DOM
- Formik + Yup
- i18next
- Tailwind CSS
- CSS modules
- OpenWeather API
- Currency API
- Lucide Icons

### 📂 Project Structure

```txt
final-project-travel-app/
├── node_modules/
├── public/
│   ├── videos/
│   │   ├── France.mp4
│   │   ├── Greece.mp4
│   │   ├── Italy.mp4
│   │   ├── Japan.mp4
│   │   ├── Maldives.mp4
│   │   ├── Mexico.mp4
│   │   ├── Spain.mp4
│   │   ├── Turkey.mp4
│   │   └── uae.mp4
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── contact.jpg
│   │       └── logo.png
│
│   ├── components/
│   │   ├── AuthTravel/
│   │   │   └── AuthTravel.tsx
│   │   ├── ContactForm/
│   │   │   └── ContactForm.tsx
│   │   ├── CountryInfoPage/
│   │   │   ├── countryComponents/
│   │   │   └── CountryInfoPage.module.css
│   │   ├── DestinationCard/
│   │   │   └── DestinationCard.tsx
│   │   ├── Footer/
│   │   │   └── Footer.tsx
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   ├── ReviewsCarousel/
│   │   │   └── ReviewsCarousel.tsx
│   │   └── Team/
│   │       ├── Team.tsx
│   │       └── TeamMemberCard.tsx
│
│   ├── context/
│   │   └── ThemeContext.tsx
│
│   ├── locales/
│   │   ├── en.json
│   │   ├── de.json
│   │   ├── ru.json
│   │   └── uk.json
│
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Account.tsx
│   │   ├── DestinationDetails.tsx
│   │   ├── Destinations.tsx
│   │   └── Home.tsx
│
│   ├── services/
│   │   └── api/
│   │       ├── currencyApi.ts
│   │       ├── destinationsApi.ts
│   │       └── weatherApi.ts
│
│   ├── data/
│   │   ├── countryInfoData.ts
│   │   ├── destinationData.ts
│   │   ├── hotelsData.ts
│   │   └── reviews.ts
│
│   ├── types/
│   │   ├── account.ts
│   │   ├── auth.ts
│   │   ├── teamMember.ts
│   │   └── types.ts
│
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── searchSlice.ts
│
│   ├── App.css
│   ├── App.tsx
│   ├── i18n.ts
│   ├── index.css
│   ├── main.tsx
│   └── store.ts
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

### ▶️ Getting Started

npm install  
npm run dev

---

## 🇩🇪 Deutsch

### 📌 Projektübersicht

**Travel App** ist eine moderne mehrsprachige Reiseplattform auf Basis von React, TypeScript und Redux Toolkit.

### 🚀 Funktionen

- Mehrsprachigkeit (EN / DE / RU / UA)
- Benutzer-Authentifizierung
- Reiseziele und Hotels
- Wetterdaten in Echtzeit
- Responsive Design

### 🛠️ Verwendete Technologien

- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- React Router DOM
- Formik + Yup
- i18next
- Tailwind CSS
- CSS-Module
- OpenWeather API
- Currency API
- Lucide Icons

### ▶️ Starten

npm install  
npm run dev

---

## 🇷🇺 Русский

### 📌 Описание проекта

**Travel App** — современное многоязычное веб-приложение для путешествий, созданное на React, TypeScript и Redux Toolkit.

### 🚀 Возможности

- 4 языка
- Регистрация и вход
- Поиск направлений
- Отели и погода
- Адаптивный интерфейс

### 🛠️ Используемые технологии

- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- React Router DOM
- Formik + Yup
- i18next
- Tailwind CSS
- CSS Modules
- OpenWeather API

### ▶️ Запуск

npm install  
npm run dev

---

## 🇺🇦 Українська

### 📌 Опис проєкту

**Travel App** — сучасна багатомовна платформа для подорожей, створена з використанням React та Redux Toolkit.

### 🚀 Можливості

- 4 мови
- Авторизація
- Напрямки та готелі
- Погода
- Адаптивний дизайн

### 🛠️ Використані технології

- React 18
- TypeScript
- Redux Toolkit
- RTK Query
- React Router DOM
- Formik + Yup
- i18next
- Tailwind CSS
- CSS Modules
- OpenWeather API
- Currency API
- Lucide Icons

### ▶️ Запуск

npm install  
npm run dev

---

## 📌 License

Educational & portfolio project.
