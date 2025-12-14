# 🌍 Travel App — React + Redux Travel Platform

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
- OpenWeather API
- Lucide Icons

### 📂 Project Structure

```txt
final-project-travel-app/
├─ src/
│  ├─ components/
│  │  ├─ AuthTravel/
│  │  │  └─ AuthTravel.tsx
│  │  ├─ ContactForm/
│  │  │  └─ ContactForm.tsx
│  │  ├─ DestinationCard/
│  │  │  └─ DestinationCard.tsx
│  │  ├─ Footer/
│  │  │  └─ Footer.tsx
│  │  ├─ Navbar/
│  │  │  └─ Navbar.tsx
│  │  └─ ReviewsCarousel/
│  │     └─ ReviewsCarousel.tsx
│  │
│  ├─ context/
│  │  └─ ThemeContext.tsx
│  │
│  ├─ locales/
│  │  ├─ de.json
│  │  ├─ en.json
│  │  ├─ ru.json
│  │  └─ uk.json
│  │
│  ├─ pages/
│  │  ├─ About.tsx
│  │  ├─ Account.tsx
│  │  ├─ DestinationDetails.tsx
│  │  ├─ Destinations.tsx
│  │  └─ Home.tsx
│  │
│  ├─ services/
│  │  ├─ api/
│  │  │  ├─ destinationsApi.ts
│  │  │  └─ weatherApi.ts
│  │  └─ data/
│  │     ├─ destinationData.ts
│  │     ├─ hotelsData.ts
│  │     └─ reviews.ts
│  │
│  ├─ types/
│  │  ├─ account.ts
│  │  ├─ auth.ts
│  │  └─ types.ts
│  │
│  ├─ slices/
│  │  ├─ authSlice.ts
│  │  └─ searchSlice.ts
│  │
│  ├─ App.tsx
│  ├─ i18n.ts
│  ├─ index.css
│  ├─ main.tsx
│  └─ store.ts
│
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ postcss.config.js
├─ README.md
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

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

### ▶️ Запуск

npm install  
npm run dev

---

## 📌 License

Educational & portfolio project.
