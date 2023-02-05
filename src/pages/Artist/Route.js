import AuthLayout from "../../layouts/AuthLayout";
import Artists from "./Artists";
import SingleArtist from "./SingleArtist";

export const artistRoute = {
  path: "/artists",
  element: Artists,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};

export const singleArtistRoute = {
  path: "/artist/:artistID",
  element: SingleArtist,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};
