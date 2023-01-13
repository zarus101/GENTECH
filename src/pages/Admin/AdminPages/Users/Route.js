
import AdminLayout from "../../../../layouts/AdminLayout";
import UserList from "./UserList";


export const userList = {
  path: "/userlist",
  element: UserList,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};