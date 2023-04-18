import { createBrowserRouter } from "react-router-dom";
import Success from "../pages/paymentState/Success";
import Failure from "../pages/paymentState/Failure";
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
  ProfileUser,
  CreateUser,
  CreateAddress,
  EditUser,
  UpdateAddress,
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
    path: "/success",
    element: <Success />,
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
    path: "/editaddress/:idaddress/*",
    element: <UpdateAddress />,
  },
  {
    path: "/admin/*",
    element: <AdminDashboard />,
  },
]);

export default router;
