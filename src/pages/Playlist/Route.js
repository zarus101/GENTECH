import AuthLayout from "../../layouts/AuthLayout";
import Playlist from "./Playlist";

export const playlistRoute = {
  path: "/playlist/:playlistID",
  element: Playlist,
  layout: AuthLayout,
  exact: true,
  isPublic: false,
};
