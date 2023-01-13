import AdminLayout from "../../layouts/AdminLayout";
import Admin from "./Admin";

export const adminRoute = {
  path: "/admin",
  element: Admin,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};