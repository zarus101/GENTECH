import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import { useEffect } from "react";
import { doLogin, isLoggedIN } from "../connection/UserService";
import FixFooter from "../Footer/FixFooter";
import axios from "axios";
import { useRef } from "react";
import { getAllMusic } from "../connection/MusicService";
import { actionType } from "../context/reducer";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";

const AuthLayout = ({ children }) => {
  const [login, setLogin] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLogin(isLoggedIN());
  }, [login]);

  const [{ allSongs, isSongPlaying, loggedIN }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    dispatch({
      type: actionType.SET_LOGGED_IN,
      loggedIN: true,
    });
  }, []);

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
