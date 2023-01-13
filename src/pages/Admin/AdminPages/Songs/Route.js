
import AdminLayout from "../../../../layouts/AdminLayout";
import AddSongs from "./AddSongs";


export const addSongs = {
  path: "/addsongs",
  element: AddSongs,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};