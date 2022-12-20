<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import Routes from "./Routes";
import "./assets/index.scss";
=======
import {  Route, Routes } from "react-router-dom";
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
>>>>>>> parent of 2243c02 (ssss)
import SideNavbar from "./Components/sideNavbar";
import Home from "./Pages/Home";
import "./Assests/index.scss"
import { useState } from "react";
import Browse from "./Pages/Browse";
import Artists from "./Pages/Artists";

import './App.css';

import Login from './pages/login/LoginForm';
import Register from './pages/register/RegisterForm';

>>>>>>> parent of 92eba3d (login and register error resolved)
=======
import React from "react";
import Routes from "./Routes";
import "./assets/index.scss";
>>>>>>> parent of 58e77e3 (added demo navbar and artist page)
=======
import React from "react";
import Routes from "./Routes";
import "./assets/index.scss";
>>>>>>> parent of 58e77e3 (added demo navbar and artist page)

function App() {
  return (
<<<<<<< HEAD
    <div className="">
      <Routes />
    </div>
=======

    <div className="app">
    <BrowserRouter >
    <SideNavbar theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/browse" element={<Browse theme={theme} setTheme={setTheme} />} />
        <Route path="/album" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/artists" element={<Artists theme={theme} setTheme={setTheme} />} />
        <Route path="/videos" element={<Home theme={theme} setTheme={setTheme} />} /> 
        <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>    
      </Routes>
    </SideNavbar>
  </BrowserRouter>
  </div>

  );
}

export default App;
