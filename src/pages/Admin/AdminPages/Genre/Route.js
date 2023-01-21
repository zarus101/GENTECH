import AdminLayout from "../../../../layouts/AdminLayout";
import AddGenre from "./AddGenre";

export const addGenreRoute = {
  path: "/addgenre",
  element: AddGenre,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};
