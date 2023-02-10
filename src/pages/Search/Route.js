import AuthLayout from "../../layouts/AuthLayout";
import Search from "./Search";

export const searchRoute = {
  path: "/search",
  element: Search,
  layout:AuthLayout ,
  exact: true,
  isPublic: false,
};
