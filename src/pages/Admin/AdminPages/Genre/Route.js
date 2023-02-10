import AdminLayout from "../../../../layouts/AdminLayout";
import AddGenre from "./AddGenre";
import GenreList from "./GenreList";
import UpdateGenre from "./UpdateGenre";

export const addGenreRoute = {
  path: "/addgenre",
  element: AddGenre,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};

export const genreList = {
  path: "/genrelist",
  element: GenreList,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};

export const updateGenreRoute = {
  path: "/updateGenre/:id",
  element: UpdateGenre,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};
