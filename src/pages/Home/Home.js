import React, { useState, useEffect, useRef } from "react";
import TopSongs from "../../components/Song/TopSongs";
import MostPlayed from "../../components/Song/MostPlayed.js";
import "../../assets/home.scss";
import "../../assets/Theme.scss";
import FixFooter from "../../Footer/FixFooter.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer.js";

import audio from "../../assets/music/test1.mp3";
import song from "../../assets/music/song.mp3";

const Home = ({ theme, setTheme }) => {
  // const [songs, setSongs] = useState(allsongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  // const [index, setIndex] = useState(0);
  // const [CurrentSong] = useState(audio);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(30);

  const audioPlayer = useRef();

  const songs = [audio, song];

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
  }, [volume, isPlaying]);

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
              // index={index}
              // setIndex={setIndex}
              // CurrentSong={CurrentSong}
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

        <FixFooter
          // index={index}
          // setIndex={setIndex}
          // CurrentSong={CurrentSong}
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
    </>
  );
};

export default Home;
