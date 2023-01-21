import AuthLayout from "../../layouts/AuthLayout";
import Genre from "./Genre";

export const genreRoute = {
  path: "/genre",
  element: Genre,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};
