import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/sidebar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import { useEffect } from "react";
import {
  doLogin,
  getCurrentUserDetail,
  isLoggedIN,
} from "../connection/UserService";
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

  const [{ allSongs, isSongPlaying, loggedIN }, dispatch] = useStateValue([]);
  const [isLoading, setIsLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState();
  const [userid, setUserid] = useState();
  const [likedSong, setLikedSongs] = useState([]);
  const [likedData, setLikedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/v1/songs");
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data,
        });
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
  }, [dispatch]);

  useEffect(() => {
    let controller = new AbortController();
    const getLikedData = async () => {
      try {
        const response = await axios.get(`/v1/getAllLiked/${userid}`, {
          signal: controller.signal,
        });
        setLikedData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikedData();
    return () => controller.abort();
  }, [userid]);

  useEffect(() => {
    const likedSongIds = likedData.map((data) => data.songID);
    const filteredLikedSongs = allSongs?.filter((song) =>
      likedSongIds.includes(song.songID)
    );

    dispatch({
      type: actionType.SET_LIKED_SONGS,
      likedSongs: filteredLikedSongs,
    });
    setLikedSongs(filteredLikedSongs);
  }, [allSongs, likedData, dispatch]);

  useEffect(() => {
    if (!isLoggedIN()) return;

    const {
      user: { id },
      token,
    } = getCurrentUserDetail();
    setUserid(id);
    setToken(token);
  }, [getCurrentUserDetail]);

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
