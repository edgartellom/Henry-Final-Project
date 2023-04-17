import { createBrowserRouter } from "react-router-dom";
import Cart from "../pages/shoppingCart/Cart";
import {
  Home,
  Login,
  Register,
  Products,
  Detail,
  Contact,
  CreateProduct,
  ShoppingCart,
  Favorites,
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
    element: <Cart />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export default router;
