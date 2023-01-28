import { isLoggedIN } from "../../connection/UserService";
import AuthLayout from "../../layouts/AuthLayout";
import Home from "../Home/Home";
import Albums from "./Albums";

export const albumRoute = {
  path: "/album",
  element: Albums,
  layout:AuthLayout ,
  exact: true,
  isPublic: false,
};
