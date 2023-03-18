import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Products } from "../pages";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/products",
        element: <Products/>
    }
])

export default router;