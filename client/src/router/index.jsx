import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products, Detail, Contact, LandingPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/landingPage",
    element: <LandingPage />,
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
