<<<<<<< Updated upstream
import React from "react";
import Routes from "./Routes";
import "./assets/index.scss";
=======

import {  Route, Routes } from "react-router-dom";
import SideNavbar from "./Components/sideNavbar";
import Home from "./Pages/Home";
import "./Assests/index.scss"
import { useState } from "react";
import Browse from "./Pages/Browse";
import Artists from "./Pages/Artists/Artists";
import Login from "./Pages/login/LoginForm";
import Register from "./Pages/register/RegisterForm";


>>>>>>> Stashed changes


function App() {
  return (
    <div className="">
      <Routes />
    </div>
  );
}

export default App;
