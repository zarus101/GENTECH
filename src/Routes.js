import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { albumRoute } from "./pages/Album/Route";
import { artistRoute } from "./pages/Artist/Route";
import { browseRoute } from "./pages/Browse/Route";
import { homeRoute } from "./pages/Home/Route";
import { loginRoute } from "./pages/Login/Route";
import { registerRoute } from "./pages/Register/Route";
import { videoRoute } from "./pages/Video/Route";

const Routes = () => {
  const isLoggedIn = true;
  const routes = [
    albumRoute,
    artistRoute,
    browseRoute,
    homeRoute,
    loginRoute,
    registerRoute,
    videoRoute,
  ];

  const result = routes.map(
    ({ element: Element, layout: Layout, path, subRoutes = [], isPublic }) => ({
      path,
      element: isPublic ? (
        <Layout>
          <Element />
        </Layout>
      ) : isLoggedIn && !isPublic ? (
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