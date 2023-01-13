
import AdminLayout from "../../../../layouts/AdminLayout";
import AddArtist from "./AddArtist";
import ArtistList from "./ArtistList";

export const addartistRoute = {
  path: "/addartist",
  element: AddArtist,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};

export const artistList = {
  path: "/artistslist",
  element: ArtistList,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};