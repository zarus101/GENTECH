import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss"
import { useState } from "react";


const AuthLayout = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="app" >
      <Sidebar theme={theme} setTheme={setTheme}>
        <Navbar />
        {children}
      </Sidebar>
    </div>
  );
};

export default AuthLayout;