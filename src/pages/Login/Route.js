import SimpleLayout from "../../layouts/SimpleLayout";
import Login from "./Login";

export const loginRoute = {
  path: "/login",
  element: Login,
  layout: SimpleLayout,
  exact: true,
  isPublic: false,
};