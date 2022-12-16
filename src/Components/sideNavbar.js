import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import sideNavbarData from "../Data/sideNavbarData";
import "../Assests/NavbarSection.scss";
import "../Assests/Theme.scss"

const SideNavbar = ({ children, setTheme, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="main-section" id={theme}>
      <div className=" main-navbar"  id="background">
      <button onClick={()=> setTheme(theme==="light"? "dark": "light")}>dark mode</button>

        <div className="top-navbar">
          <ul>
            {sideNavbarData.topNav.map((item, index) => (
              <>
                <a
               
                  style={{ textDecoration: "none" }}
                  key={index}
                  activeclassName="active"
                >
                  <li className="nav-list" id="text">
                    <div className="icon">{item.icon}</div>
                    <div className="nav-item">{item.name}</div>
                  </li>
                </a>
              </>
            ))}
          </ul>
        </div>
        <div className="nav-header" id="text">
          <h2>MY MUSIC</h2>
        </div>

        <div className="middle-navbar">
          <ul>
            {sideNavbarData.myMusic.map((item, index) => (
              <>
                <a
                  style={{ textDecoration: "none" }}
                  key={index}
                  activeclassName="active"
                >
                  <li className="nav-list" id="text">
                    <div className="icon">{item.icon}</div>
                    <div className="nav-item">{item.name}</div>
                  </li>
                </a>
              </>
            ))}
          </ul>
        </div>

        <div className="nav-header">
          <h2>PLAYLISTS</h2>
        </div>
        <div className="bottom-navbar">
          <ul>
            {sideNavbarData.playlist.map((item, index) => (
              <>
                <a
                  style={{ textDecoration: "none" }}
                  key={index}
                  activeclassName="active"
                >
                  <li className="nav-list" id="text">
                    
                    <div className="nav-item">{item.name}</div>
                  </li>
                </a>
              </>
            ))}
          </ul>
        </div>
      </div>

      <div className="content-part" id="content">
        <div className="right-section">
          <div className="content" >{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SideNavbar;
