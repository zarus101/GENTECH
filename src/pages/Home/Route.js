import Home from "./Home";
import AuthLayout from "../../layouts/AuthLayout";
import "../../assets/Theme.scss"


export const homeRoute = {
  path: "/",
  element: Home,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};