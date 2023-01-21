import React, { useState, useEffect } from "react";
import TopSongs from "../../components/Song/TopSongs";
import MostPlayed from "../../components/Song/MostPlayed.js";
import "../../assets/home.scss";
// import Topbar from "../../components/Navbar/Navbar.js";
import "../../assets/Theme.scss";
import FixFooter from "../../Footer/FixFooter.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer.js";

import allsongs from "../../services/songData";

const Home = ({ theme, setTheme }) => {
  const [songs, setSongs] = useState(allsongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > songs.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [currentSongIndex, songs.length]);

  return (
    <>
      <div className="home">
        <TopSongs />

        <div className="double_column">
          <div className="left_column">
            <MusicPlayer
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              nextSongIndex={nextSongIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              songs={songs}
            />
          </div>
          <div className="right_column">
            <MostPlayed />
          </div>
        </div>

        <br />
        <br />

        <FixFooter
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
        />
      </div>
    </>
  );
};

export default Home;
