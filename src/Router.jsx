
import {
    createBrowserRouter
} from "react-router-dom";
import Root from "./Layout/Root";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingUp from "./pages/SingUp/SingUp";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/singUp',
          element:<SingUp></SingUp>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
      ]
    },
  ]);