import Profile from "./Profile";
import AuthLayout from "../../layouts/AuthLayout";
import "../../assets/Theme.scss";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import AdminLayout from "../../layouts/AdminLayout";


export const profileRoute = {
  path: "/profile",
  element: Profile,
  layout: (() => {
    switch (isLoggedIN() && getCurrentUserDetail().user.role) {
      case "admin":
        return AdminLayout;
      case "normal":
        return AuthLayout;
      default:
        return AuthLayout;
    }
  })(),

  exact: true,
  isPublic: false,
};

console.log(getCurrentUserDetail());
