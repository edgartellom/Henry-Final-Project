import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products, Detail, Contact } from "../pages";
import CreateProduct from "../pages/create/CreateProduct";
import ShoppingCart from '../pages/shoppingCart/ShoppingCart'

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/products/:id",
    element: <Detail />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path:"/create",
    element: <CreateProduct />
  },
  {
    path:"/cart",
    element: <ShoppingCart />
  }
]);

export default router;
