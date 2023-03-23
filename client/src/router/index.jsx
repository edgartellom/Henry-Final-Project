import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products, Detail, Contact } from "../pages";
import CreateProduct from "../pages/create/CreateProduct";

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
  }
]);

export default router;
