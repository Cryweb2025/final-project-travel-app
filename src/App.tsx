import { Routes, Route } from "react-router-dom";

// Основные layout-компоненты
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Страницы приложения
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Account from "./pages/Account";
import DestinationDetails from "./pages/DestinationDetails";

// Компоненты
import AuthTravel from "./components/AuthTravel/AuthTravel";
import ContactForm from "./components/ContactForm/ContactForm";

// Корневой компонент приложения
function App() {
  return (
    // Основной контейнер страницы с вертикальной компоновкой
    <div className="flex flex-col min-h-screen">
      {/* Верхняя навигационная панель */}
      <Navbar />

      {/* Основная зона контента между Navbar и Footer */}
      <main className="flex-grow flex">
        <div className="flex-grow">
          <Routes>
            {/* Главная страница — занимает всю доступную ширину и высоту */}
            <Route path="/" element={<Home />} />

            {/* Страница с подробной информацией о выбранном направлении */}
            <Route path="/destination/:key" element={<DestinationDetails />} />

            {/* Страница со списком направлений (центрированный контейнер) */}
            <Route
              path="/destinations"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <Destinations />
                </div>
              }
            />

            {/* Страница "О проекте" */}
            <Route
              path="/about"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <About />
                </div>
              }
            />

            {/* Страница формы обратной связи */}
            <Route
              path="/contact"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <ContactForm />
                </div>
              }
            />

            {/* Страница авторизации / регистрации */}
            <Route
              path="/login"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <AuthTravel />
                </div>
              }
            />

            {/* Личный кабинет пользователя */}
            <Route
              path="/account"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <Account />
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Нижний футер сайта */}
      <Footer />
    </div>
  );
}

export default App;
