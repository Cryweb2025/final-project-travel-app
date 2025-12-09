import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Fotter";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Navbar oben */}
        <Navbar />

        {/* Hauptinhalt */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Footer unten */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;


