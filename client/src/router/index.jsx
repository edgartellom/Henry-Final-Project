import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products, Detail, Contact } from "../pages";
import Pending from "../components/paymentState/Pending";
import Success from "../components/paymentState/Success";
import Failure from "../components/paymentState/Failure";

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
    path: "/failure",
    element: <Failure />,
  },
  {
    path: "/pending",
    element: <Pending />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

export default router;
