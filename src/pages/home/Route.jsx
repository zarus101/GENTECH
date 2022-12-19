import AuthLayout from "../../layouts/AuthLayout";
import Home from "./Home";


export const HomeRoute = {
    path: "/",
    element: Home,
    layout: AuthLayout,
    exact: true,
    isPublic: true,
  };

  