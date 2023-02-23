
import AdminLayout from "../../../../layouts/AdminLayout";
import UpdateUser from "./UpdateUser";
import UserList from "./UserList";
import UserList1 from "./UserList1";


export const userList = {
  path: "/userlist",
  element: UserList1,
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