import { createBrowserRouter } from "react-router-dom";
import Pending from "../components/paymentState/Pending";
import Success from "../components/paymentState/Success";
import Failure from "../components/paymentState/Failure";
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
  ProfileUser,
  CreateUser,
  CreateAddress,
  EditUser,
  //EditAddress,
  AdminDashboard,
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
  {
    path: "/create",
    element: <CreateProduct />,
  },
  {
    path:"/cart",
    element: <Cart />
  },
   {
    path: "/profile/:iduser",
    element: <ProfileUser />,
  },
  {
    path: "/createuser/:iduser/*",
    element: <CreateUser />,
  },
  {
    path: "/createaddress/:iduser/*",
    element: <CreateAddress />,
  },
  {
    path: "/edituser/:iduser/*",
    element: <EditUser />,
  },
  {
    path: "/admin/*",
    element: <AdminDashboard/>,
  }

]);

export default router;
