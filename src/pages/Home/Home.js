import React, { useState, useEffect, useRef } from "react";
import TopSongs from "../../components/Song/TopSongs";
import MostPlayed from "../../components/Song/MostPlayed.js";
import "../../assets/home.scss";
import "../../assets/Theme.scss";
import FixFooter from "../../Footer/FixFooter.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer.js";

// import audio from "../../assets/music/test1.mp3";
// import song from "../../assets/music/song.mp3";
import axios from "axios";
import { useStateValue } from "../../context/stateProvider";

const Home = () => {
  const [{ isSongPlaying }, dispatch] = useStateValue([]);
  return (
    <>
      <div className="home">
        <TopSongs />

        <div className="double_column">
          <div className="left_column">
            {isSongPlaying && (
              <>
                <MusicPlayer />
              </>
            )}
          </div>
          <div className="right_column">
            <MostPlayed />
          </div>
        </div>

        <br />
        <br />
      </div>
    </>
  );
};

export default Home;
