import React from "react";

export const createRoutes = (routes) => {
  return routes.map(
    ({ element: Element, layout: Layout, path, isPublic, subRoutes = [] }) => {
      return isPublic
        ? {
            path,
            element: (
              <Layout>
                <Element />
              </Layout>
            ),
            children: subRoutes,
          }
        : {
            path,
            element: (
              <Layout>
                <Element />
              </Layout>
            ),
            children: subRoutes,
          };
    }
  );
};
