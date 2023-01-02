import AuthLayout from "../../layouts/AuthLayout";
import Videos from "./Videos";

export const videoRoute = {
  path: "/videos",
  element: Videos,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};