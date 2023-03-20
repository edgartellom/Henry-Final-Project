import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products, Detail, Contact, LandingPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

export default router;
