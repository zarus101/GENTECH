import SimpleLayout from "../../layouts/SimpleLayout";
import Login from "./LoginForm";

export const LoginRoute = {
  path: "/login",
  element: Login,
  layout: SimpleLayout,
  exact: true,
  isPublic: true,
};
