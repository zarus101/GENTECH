import Profile from "./Profile";
import AuthLayout from "../../layouts/AuthLayout";
import "../../assets/Theme.scss"


export const profileRoute = {
  path: "/profile",
  element: Profile,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};