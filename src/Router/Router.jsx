
import {
  createBrowserRouter
} from "react-router-dom";
import Root from "../Layout/Root";
import AllProducts from "../pages/AllProducts/AllProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProtectorRuout from "./ProtectorRuout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/allProducts',
        element: <ProtectorRuout>
          <AllProducts></AllProducts>
        </ProtectorRuout>,
        loader:()=>fetch('https://product-finder-pro-server.vercel.app/productsCount')
      },
    ]
  },
]);