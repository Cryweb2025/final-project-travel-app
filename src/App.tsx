import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import AuthTravel from "./components/AuthTravel/AuthTravel";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm/ContactForm";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Средняя зона между Navbar и Footer */}
      <main className="flex-grow flex">
        {/* ВАЖНО: эта обёртка получает всю оставшуюся высоту */}
        <div className="flex-grow">
          <Routes>
            {/* Home на всю доступную ширину/высоту */}
            <Route path="/" element={<Home />} />

            {/* Остальные страницы — в центре с max-width */}
            <Route
              path="/destinations"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <Destinations />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <About />
                </div>
              }
            />

            <Route
              path="/contact"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <ContactForm />
                </div>
              }
            />

            <Route
              path="/login"
              element={
                <div className="max-w-5xl mx-auto w-full py-8">
                  <AuthTravel />
                </div>
              }
            />
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

      <Footer />
    </div>
  );
}

export default App;
