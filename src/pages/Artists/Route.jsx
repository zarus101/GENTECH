import AuthLayout from "../../layouts/AuthLayout";
import Artists from "./Artists";


export const ArtistsRoute = {
    path: "/artists",
    element: Artists,
    layout: AuthLayout,
    exact: true,
    isPublic: true,
  };