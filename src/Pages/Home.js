import React from "react";

import TopArtists from "../Components/TopArtists.js";
import MostPlayed from "../Components/MostPlayed.js";

import '../Assests/home.scss';

const Home = ({ theme, setTheme }) => {
  return (
    <>
      <div className="home">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          dark mode
        </button>
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
