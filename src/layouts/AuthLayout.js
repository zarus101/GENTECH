import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import { useEffect } from "react";
import { isLoggedIN } from "../connection/UserService";
import FixFooter from "../Footer/FixFooter";
import axios from "axios";
import { useRef } from "react";

const AuthLayout = ({ children }) => {
  const [login, setLogin] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLogin(isLoggedIN());
  }, [login]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songs, setSongs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const audioPlayer = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/v1/songs");
        let _musics = data;
        console.log(_musics);
        _musics.map((music) => {
          let pload = {
            songName: music.songName,
            artistName: music.artistName,
            src: `/public/songs/${music.song}`,
          };
          setIsLoading(false);
          return setSongs((oldSongs) => [...oldSongs, pload]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (audioPlayer?.current) {
        if (isPlaying) {
          audioPlayer.current.play();
        } else {
          audioPlayer.current.pause();
        }
      }
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
    return () => {
      subscribed = false;
    };
  },[isPlaying]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="app">
      <Sidebar theme={theme} setTheme={setTheme}>
        <Navbar theme={theme} setTheme={setTheme} />

        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            currentSongIndex,
            setCurrentSongIndex,
            nextSongIndex,
            songs,
            isPlaying,
            setIsPlaying,
            volume,
            setVolume,
            audioPlayer,
            elapsed,
            duration
          })
        )}


        <FixFooter
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
      </Sidebar>
    </div>
  );
};

export default AuthLayout;
