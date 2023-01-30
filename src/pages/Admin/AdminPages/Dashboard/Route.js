import AdminLayout from "../../../../layouts/AdminLayout";
import Dashboard from "./Dashboard";

export const adminDashboard = {
  path: "/admin/dashboard",
  element: Dashboard,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};
