
import AdminLayout from "../../../../layouts/AdminLayout";
import Calendar from "./Calender";

export const calenderRoute = {
  path: "/calendar",
  element: Calendar,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};