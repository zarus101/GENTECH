
import AdminLayout from "../../../../layouts/AdminLayout";
import UpdateUser from "./UpdateUser";
import UserList from "./UserList";


export const userList = {
  path: "/userlist",
  element: UserList,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};

export const updateUserRoute = {
  path: "/updateuser/:id",
  element: UpdateUser,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};