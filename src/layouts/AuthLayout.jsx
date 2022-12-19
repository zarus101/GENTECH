import React from "react";
import SideNavbar from "../components/sidebar/SideNavbar";

const AuthLayout = ({ children }) => {
  return (
    <>
      {/*  header goes here */}
      <SideNavbar />
      {children}
    </>
  );
};
export default AuthLayout;
