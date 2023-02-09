import React, { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import {
  addartistRoute,
  artistList,
  updateArtistRoute,
} from "./pages/Admin/AdminPages/Artist/Route";
import { calenderRoute } from "./pages/Admin/AdminPages/Calender/Route";
import { adminDashboard } from "./pages/Admin/AdminPages/Dashboard/Route";
import { addSongs, listSongs } from "./pages/Admin/AdminPages/Songs/Route";
import { updateUserRoute, userList } from "./pages/Admin/AdminPages/Users/Route";
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
import { searchRoute } from "./pages/Search/Route";

const Routes = () => {
  const [login, setLogin] = useState(false);

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
    listSongs,
    addGenreRoute,
    adminDashboard,
    artistList,
    userList,
    profileRoute,
    searchRoute,
    updateUserRoute,
  ];

  const result = routes.map(
    ({ element: Element, layout: Layout, path, subRoutes = [], isPublic }) => ({
      path,
      element: isPublic ? (
        <Layout>
          <Element />
        </Layout>
      ) : setLogin && !isPublic ? (
        <Layout>
          <Element />
        </Layout>
      ) : (
        <Navigate to="/login" />
      ),
      children: subRoutes,
    })
  );

  return useRoutes(result);
};

export default Routes;
