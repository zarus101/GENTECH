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

const Home = (props) => {
  const { theme, setTheme, currentSongIndex, setCurrentSongIndex, nextSongIndex, songs, isPlaying, setIsPlaying, volume, setVolume, audioPlayer } = props;
  return (
    <>
      <div className="home">
        <TopSongs />

        <div className="double_column">
          <div className="left_column">
            <MusicPlayer
            theme={theme}
            setTheme={setTheme}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            songs={songs}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            volume={volume}
            setVolume={setVolume}
            audioPlayer={audioPlayer}
            />
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
