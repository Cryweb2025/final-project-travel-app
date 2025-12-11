import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);


import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContactForm from "./components/ContactForm/ContactForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ContactForm />
    </BrowserRouter>
  </React.StrictMode>
);
