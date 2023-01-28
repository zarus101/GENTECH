import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import { useEffect } from "react";
import { isLoggedIN } from "../connection/UserService";

const AuthLayout = ({ children }) => {
  const [login, setLogin] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLogin(isLoggedIN());
  }, [login]);

  return (
    <div className="app">
      <Sidebar theme={theme} setTheme={setTheme}>
        <Navbar theme={theme} setTheme={setTheme} />

        {children}
      </Sidebar>
    </div>
  );
};

export default AuthLayout;
