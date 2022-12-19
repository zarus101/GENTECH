import { useRoutes } from "react-router-dom";
import { SignUpRoute } from "./pages/register/Route";
import { createRoutes } from "./utils/routeUtils";
import { LoginRoute } from "./pages/login/Route";
import { HomeRoute } from "./pages/home/Route";
import { BrowseRoute } from "./pages/browse/Route";
import { ArtistsRoute } from "./pages/artists/Route";

const Routes = () => {
  const appRoutes = [
    SignUpRoute,
    LoginRoute,
    HomeRoute,
    BrowseRoute,
    ArtistsRoute,
  ];
  return useRoutes(createRoutes(appRoutes));
};

export default Routes;
