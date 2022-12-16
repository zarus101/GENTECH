import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavbar from "./Components/sideNavbar";
import Home from "./Pages/Home";
import "./Assests/index.scss"
import { useState } from "react";


function App() {
  const [theme, setTheme]= useState("light");
  return (
    <BrowserRouter >
    <SideNavbar theme={theme} setTheme={setTheme}/>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
     
      </Routes>
 
  </BrowserRouter>

  );
}

export default App;
