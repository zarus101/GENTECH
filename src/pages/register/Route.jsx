import SimpleLayout from "../../layouts/SimpleLayout";
import Register from "./RegisterForm";

export const SignUpRoute = {
  path: "/register",
  element: Register,
  layout: SimpleLayout,
  exact: true,
  isPublic:true
};

