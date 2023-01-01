import { Route, Routes } from "react-router-dom";
import SideNavbar from "./Components/sideNavbar";
import Home from "./Pages/Home";
import "./Assests/index.scss"
import { useState } from "react";
import Browse from "./Pages/Browse";
import Artists from "./Pages/Artists";
import Topbar from "./Commons/Navbar";
import Videos from "./Pages/Videos";
import SingleArtist from "./Pages/SingleArtist";


function App() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="app">
      <SideNavbar theme={theme} setTheme={setTheme}>
      <Topbar theme={theme} setTheme={setTheme}/>
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="/browse"
            element={<Browse theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="/album"
            element={<Home theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="/artists"
            element={<Artists theme={theme} setTheme={setTheme} />}
          />

<Route
            path="/artist/:id"
            element={<SingleArtist  theme={theme} setTheme={setTheme} />}
          />
          <Route
            path="/videos"
            element={<Videos theme={theme} setTheme={setTheme} />}
          />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </SideNavbar>
    </div>
  );
}

export default App;
