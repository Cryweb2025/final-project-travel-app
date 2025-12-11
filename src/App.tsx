import { Routes, Route } from "react-router-dom";

import { CountryInfoPage } from "./components/countryInfoPage";

import AuthTravel from "./components/AuthTravel/AuthTravel";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home page</h1>} />

      <Route path="/country/:id" element={<CountryInfoPage />} />

      <Route path="/" element={<AuthTravel />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
