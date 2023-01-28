import AdminLayout from "../../../../layouts/AdminLayout";
import AddArtist from "./AddArtist";
import ArtistList from "./ArtistList";
import UpdateArtist from "./UpdateArtist";

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

export const updateArtistRoute = {
  path: "/updateArtist/:id",
  element: UpdateArtist,
  layout: AdminLayout,
  exact: true,
  isPublic: false,
};
