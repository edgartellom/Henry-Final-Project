import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import "@picocss/pico";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import axios from "axios";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store/storeRedux";
import { UserContextProvider } from "./components/contexts/userContexts";

axios.defaults.baseURL =
  import.meta.env.VITE_APP_API || "http://localhost:3001";
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <App />
        <RouterProvider router={router} />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>
);
