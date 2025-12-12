import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim() !== "") {
      dispatch(login(username));
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{t("login")}</h1>
      <input
        type="text"
        placeholder={t("enter_name")}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.8rem", borderRadius: "8px", marginRight: "1rem" }}
      />
      <button onClick={handleLogin} style={{ padding: "0.8rem 1.5rem" }}>
        {t("login")}
      </button>
    </div>
  );
};

export default Login;



