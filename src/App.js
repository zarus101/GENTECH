import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavbar from "./Components/sideNavbar";
import Home from "./Pages/Home";
import "./Assests/index.scss"
import { useState } from "react";
import Browse from "./Pages/Browse";
import Artists from "./Pages/Artists";

import './App.css';

import Login from './pages/login/LoginForm';
import Register from './pages/register/RegisterForm';


function App() {
  const [theme, setTheme]= useState("light");
  return (

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
