import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {motion} from 'framer-motion';
import "../../assets/MostPlayed.scss";
import { useEffect } from "react";
import { getAllMusic } from "../../connection/MusicService";
import { useStateValue } from "../../context/stateProvider";
import { actionType } from "../../context/reducer";
import axios from "axios";

export default function MostPlayed({ theme }) {
  const [setIsActive] = useState(false);
  const [songs, setSongs] = useState([]);
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
    console.log(song);
  };

  const handleClick = (index) => {
    setIsActive((current) => !current);
  };

  // useEffect(() => {
  //   getAllMusic()
  //     .then((data) => {
  //       setSongs(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("/v1/getMostPlayedSongs");
        console.log(res.data);
        setSongs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSongs();
  }, [songs]);

  const [setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleMostPlayed = async (id) => {
    try {
      const response = await axios.put(`v1/updateplay/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="mostplayed" id={theme}>
      <div className="mostplayed_header">
        <h2 id="text">
          Mostly Played <FavoriteIcon className="favouriteicon" />
        </h2>

        <p className="grey_text">
          {songs.length} songs in the list{" "}
          <ArrowCircleDownIcon className="arrowdown" />
        </p>
      </div>

      {songs.slice(0, 5).map((song, index) => (
        <motion.div
        initial={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
          className="mostplayed_element_play"
          onClick={() => addSongToContext(song.songID)}
          key={index}
        >
          <div className="left">
            <span className="primary_text_color">{song.songID}</span>

            <img
              src={
                song.coverphoto
                  ? `/public/img/coverphoto/${song.coverphoto}`
                  : "../images/download.jfif"
              }
              style={{ height: "50px" }}
              alt="artists"
            />

            <PlayArrowIcon className="grey_text" />

            <span
              className="primary_text_color"
              onClick={() => handleMostPlayed(song.songID)}
            >
              {song.songName}
            </span>
          </div>

          <div className="right">
            {/* <span className="grey_text">{song.Description}</span> */}
            {/* <span className="grey_text">{artist.duration}</span> */}

            <div className="audio">
              <audio
                className="audio"
                controls
                onPlay={handlePlay}
                onPause={handlePause}
                src={`/public/songs/${song.song}`}
              ></audio>
            </div>

            <span>
              <img
                style={{ height: "50px" }}
                src="../images/visualizer.gif"
                alt=""
              />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
