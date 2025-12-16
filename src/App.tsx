import { Routes, Route } from "react-router-dom";

// Основные layout-компоненты
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Страницы приложения
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import AuthTravel from "./components/AuthTravel/AuthTravel";
import ContactForm from "./components/ContactForm/ContactForm";
import Team from "./components/Team/Team";


import { CountryInfoPage } from "./components/CountryInfoPage/CountryInfoPage";
import Account from "./pages/Account";
import DestinationDetails from "./pages/DestinationDetails";

// Корневой компонент приложения
function App() {
  return (
    /**
     * Компонент фиксирует высоту приложения в пределах экрана
     * и распределяет её между Navbar, main и Footer.
     * overflow-hidden убирает случайную прокрутку из-за субпикселей/теней.
     */
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Компонент рендерит верхнюю навигацию. */}
      <Navbar />

      {/* Средняя зона между Navbar и Footer */}
      <main className="flex-grow flex overflow-y-auto">
        {/* ВАЖНО: эта обёртка получает всю оставшуюся высоту */}
        <div className="flex-grow">
          <Routes>
            {/* Home на всю доступную ширину/высоту */}
            <Route path="/" element={<Home />} />

          {/* Компонент показывает страницу деталей направления. */}
          <Route path="/destination/:key" element={<DestinationDetails />} />

          {/* Компонент оборачивает страницу направлений в центрированный контейнер. */}
          <Route
            path="/destinations"
            element={
              <div className="max-w-5xl mx-auto w-full py-8">
                <Destinations />
              </div>
            }
          />

          {/* Компонент оборачивает страницу "О проекте" в центрированный контейнер. */}
          <Route
            path="/about"
            element={
              <div className="max-w-5xl mx-auto w-full py-8">
                <Team />
              </div>
            }
          />

          {/* Компонент оборачивает контактную форму в центрированный контейнер. */}
          <Route
            path="/contact"
            element={
              <div className="max-w-5xl mx-auto w-full py-8">
                <ContactForm />
              </div>
            }
          />

          {/* Компонент оборачивает страницу логина в центрированный контейнер. */}
          <Route
            path="/login"
            element={
              <div className="max-w-5xl mx-auto w-full py-8">
                <AuthTravel />
              </div>
            }
          />

          {/* Компонент оборачивает личный кабинет в центрированный контейнер. */}
          <Route
            path="/account"
            element={
              <div className="max-w-5xl mx-auto w-full py-8">
                <Account />
              </div>
            }
          />

          <Route path="/countries/:id" element={<CountryInfoPage />} />

        </Routes>
         </div> 
      </main>

      {/* Компонент рендерит нижний футер. */}
      <Footer />
    </div>
  );
}

export default App;





