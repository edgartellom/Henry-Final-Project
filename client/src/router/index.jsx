import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Products,
  Detail,
  Contact,
  CreateProduct,
  ShoppingCart,
} from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <Detail />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/create",
    element: <CreateProduct />,
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
  },
  {
    path: "/profile",
    element: <ProfileUser />,
  }
]);

export default router;
