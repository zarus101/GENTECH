import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { isLoggedIN } from "./connection/UserService";
import {
  addartistRoute,
  artistList,
  updateArtistRoute,
} from "./pages/Admin/AdminPages/Artist/Route";
import { calenderRoute } from "./pages/Admin/AdminPages/Calender/Route";
import { adminDashboard } from "./pages/Admin/AdminPages/Dashboard/Route";
import { addSongs } from "./pages/Admin/AdminPages/Songs/Route";
import { userList } from "./pages/Admin/AdminPages/Users/Route";
import { addGenreRoute } from "./pages/Admin/AdminPages/Genre/Route";
import { adminRoute } from "./pages/Admin/Route";
import { albumRoute } from "./pages/Album/Route";
import { artistRoute, singleArtistRoute } from "./pages/Artist/Route";
import { browseRoute } from "./pages/Browse/Route";
import { homeRoute } from "./pages/Home/Route";
import { loginRoute } from "./pages/Login/Route";
import { registerRoute } from "./pages/Register/Route";
import { profileRoute } from "./pages/Profile/Route";
import { genreRoute } from "./pages/Genre/Route";

const Routes = () => {
  const routes = [
    albumRoute,
    artistRoute,
    singleArtistRoute,
    browseRoute,
    homeRoute,
    loginRoute,
    registerRoute,
    genreRoute,
    profileRoute,
    adminRoute,
    addartistRoute,
    updateArtistRoute,
    calenderRoute,
    addSongs,
    addGenreRoute,
    adminDashboard,
    artistList,
    userList,
  ];

  const result = routes.map(
    ({ element: Element, layout: Layout, path, subRoutes = [], isPublic }) => ({
      path,
      element: isPublic ? (
        <Layout>
          <Element />
        </Layout>
      ) : isLoggedIN && !isPublic ? (
        <Layout>
          <Element />
        </Layout>
      ) : (
        <Navigate to="/sign-in" />
      ),
      children: subRoutes,
    })
  );

  return useRoutes(result);
};

export default Routes;
