import AuthLayout from "../../layouts/AuthLayout";
import Home from "../Home/Home";

export const albumRoute = {
  path: "/album",
  element: Home,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};