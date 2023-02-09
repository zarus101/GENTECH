import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import AdminSidebar from "../pages/Admin/global/AdminSidebar";
import { Route, Routes } from "react-router-dom";
import AddArtist from "../pages/Admin/AdminPages/Artist/AddArtist";
import FixFooter from "../Footer/FixFooter";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

const AdminLayout = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isSidebar, setIsSidebar] = useState(true);
 
  return (
    <div className="app">
      <AdminSidebar theme={theme} setTheme={setTheme} isSidebar={isSidebar}>
        <Navbar theme={theme} setTheme={setTheme} />
        {children}

      </AdminSidebar>
    </div>
  );
};

export default AdminLayout;
