import AuthLayout from "../../layouts/AuthLayout";
import Browse from "./Browse";

export const browseRoute = {
  path: "/browse",
  element: Browse,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};