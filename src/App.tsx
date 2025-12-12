import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Login from "./pages/Login";
import AuthTravel from "./components/AuthTravel/AuthTravel";
import Account from "./pages/Account";
import DestinationDetails from "./pages/DestinationDetails";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/destination/:key" element={<DestinationDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/* Страница регистрации / логина */}
        <Route path="/login" element={<AuthTravel />} />
        {/* Профиль пользователя */}
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}
export default App;
