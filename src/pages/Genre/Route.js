import AuthLayout from "../../layouts/AuthLayout";
import Genre from "./Genre";
import SingleGenre from "./SingleGenre";

export const genreRoute = {
  path: "/genre",
  element: Genre,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};

export const singleGenreRoute = {
  path: "/genre/:genreName",
  element: SingleGenre,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};
