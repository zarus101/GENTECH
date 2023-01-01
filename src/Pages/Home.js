import React from "react";

import TopArtists from "../Components/TopArtists.js";
import MostPlayed from "../Components/MostPlayed.js";

import '../Assests/home.scss';
import Topbar from "../Commons/Navbar.js";

const Home = ({ theme, setTheme }) => {
  return (
    <>
      <div className="home">
      
        <TopArtists />

        <div
          className="double_column"
          
        >
          <div className="left_column">
            Music
          </div>
          <div className="right_column">
            <MostPlayed />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
