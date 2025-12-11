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
