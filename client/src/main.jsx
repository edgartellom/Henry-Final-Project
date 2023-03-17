import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@picocss/pico";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";


import router from "./router";

// axios.defaults.baseURL =
//   import.meta.env.VITE_APP_API || "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);
