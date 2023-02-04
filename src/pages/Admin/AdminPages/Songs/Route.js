
import AdminLayout from "../../../../layouts/AdminLayout";
import AddSongs from "./AddSongs";
import ListAllSongs from "./ListAllSongs";


export const addSongs = {
  path: "/addsongs",
  element: AddSongs,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};

export const listSongs = {
  path: "/songs",
  element: ListAllSongs,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};