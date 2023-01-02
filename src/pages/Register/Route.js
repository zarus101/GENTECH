import SimpleLayout from "../../layouts/SimpleLayout";
import Register from "./Register";

export const registerRoute = {
  path: "/register",
  element: Register,
  layout: SimpleLayout,
  exact: true,
  isPublic: false,
};