<<<<<<< HEAD
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
import Artists from "./Pages/Artists";
// import Login from "./pages/login/LoginForm";
// import Register from "./Pages/register/RegisterForm";

>>>>>>> parent of 92eba3d (login and register error resolved)

function App() {
  return (
<<<<<<< HEAD
    <div className="">
      <Routes />
    </div>
=======

    <div className="app">
   
    <SideNavbar theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/browse" element={<Browse theme={theme} setTheme={setTheme} />} />
        <Route path="/album" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/artists" element={<Artists theme={theme} setTheme={setTheme} />} />
        <Route path="/videos" element={<Home theme={theme} setTheme={setTheme} />} /> 
         {/* <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>      */}
      </Routes>
    </SideNavbar>

  </div>

>>>>>>> parent of 92eba3d (login and register error resolved)
  );
}

export default App;
