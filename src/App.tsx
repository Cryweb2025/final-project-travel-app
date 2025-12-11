import { Routes, Route } from "react-router-dom";
import { CountryInfoPage } from "./components/countryInfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />

      <Route path="/country/:id" element={<CountryInfoPage />} />
    </Routes>
  );
}

export default App;
