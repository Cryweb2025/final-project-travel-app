import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/* Fallback für nicht existierende Seiten */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
import { Routes, Route } from "react-router-dom";
import AuthTravel from "./components/AuthTravel/AuthTravel";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthTravel />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;





