import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {motion} from 'framer-motion';
import "../../assets/MostPlayed.scss";
import { useEffect } from "react";
import { getAllMusic } from "../../connection/MusicService";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

export default function MostPlayed({ theme }) {
  const [setIsActive] = useState(false);
  const [songs, setSongs] = useState([]);
  const [{ currentlyPlayingSong,allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  const addSongToContext = (index, currentsong) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      })
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      })
    }
    console.log(currentsong);
  };

  const handleClick = (index) => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    getAllMusic()
      .then((data) => {
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
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
          55 songs in the list <ArrowCircleDownIcon className="arrowdown" />
        </p>
      </div>

      {songs.slice(0, 5).map((song, index) => (
        <motion.div
        initial={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
          className="mostplayed_element_play"
          onClick={() => addSongToContext(index, song)}
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

            <span className="primary_text_color">{song.songName}</span>
          </div>

          <div className="right">
            {/* <span className="grey_text">{song.Description}</span> */}
            {/* <span className="grey_text">{artist.duration}</span> */}

            {/* <div className="audio">
              <audio
                className="audio"
                controls
                onPlay={handlePlay}
                onPause={handlePause}
                src={`/public/songs/${song.song}`}
              ></audio>
            </div> */}

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
