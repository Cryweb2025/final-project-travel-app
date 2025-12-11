import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim() === "") {
      setError(t("error_empty_name"));
      return;
    }
    dispatch(login(username));
    setError("");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{t("login")}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <input
            type="text"
            placeholder={t("enter_name")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "0.8rem",
              borderRadius: "8px",
              marginRight: "1rem",
              flex: "0 0 250px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              background: "#0077b6",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t("login")}
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;




