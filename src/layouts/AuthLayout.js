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
import { getAllMusic } from "../connection/MusicService";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";
import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  const [login, setLogin] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLogin(isLoggedIN());
  }, [login]);

  const [
    { user, allSongs, song, Playing, isSongPlaying, miniPlayer },
    dispatch,
  ] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const audioRef = useRef();

  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);

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
    getAllMusic().then((data) => {
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: data,
      });
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="app">
      <Sidebar theme={theme} setTheme={setTheme}>
        <Navbar theme={theme} setTheme={setTheme} />

        {children}

        {isSongPlaying && (
          <div>
            <FixFooter />
          </div>
        )}
      </Sidebar>
    </div>
  );
};

export default AuthLayout;
