import AuthLayout from "../../layouts/AuthLayout";
import Artists from "./Artists";

export const artistRoute = {
  path: "/artists",
  element: Artists,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};