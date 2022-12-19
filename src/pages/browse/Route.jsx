import AuthLayout from "../../layouts/AuthLayout";
import Browse from "./Browse";

export const BrowseRoute = {
  path: "/browse",
  element: Browse,
  layout: AuthLayout,
  exact: true,
  isPublic: true,
};