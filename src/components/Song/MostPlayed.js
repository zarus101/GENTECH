import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { motion } from "framer-motion";
import "../../assets/MostPlayed.scss";
import { useEffect } from "react";
import { getAllMusic } from "../../connection/MusicService";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import SongComments from "./SongComment";

export default function MostPlayed({ theme }) {
  const [setIsActive] = useState(false);
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [
    { currentlyPlayingSong, allSongs, Playing, song, isSongPlaying },
    dispatch,
  ] = useStateValue();

  const [open, setOpen] = useState(false);
 
  const handleClose = () => setOpen(false);

  const handleOpenComments = (songId) => {
    setSelectedSongId(songId);
    setOpen(true)
  }

  const addSongToContext = (songID, currentSong) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentSong,
      });
    }
    if (song !== songID) {
      dispatch({
        type: actionType.SET_SONG,
        song: songID,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentSong,
      });
    }
    console.log(currentSong);
    console.log(songID);
  };

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
  }, []);

  const [setIsPlaying] = useState(false);

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
          onClick={() => addSongToContext(song.songID, song)}
          key={index}
        >
          <div className="left">
            <img
              src={
                song.coverphoto
                  ? `/public/img/coverphoto/${song.coverphoto}`
                  : "../images/download.jfif"
              }
              style={{ height: "50px" }}
              alt="artists"
            />

            {Playing && currentlyPlayingSong?.songID === song.songID ? (
              <PauseCircleIcon className="grey_text" onClick={handlePause} />
            ) : (
              <PlayCircleIcon className="grey_text" />
            )}

            <span
              className="primary_text_color"
              onClick={() => handleMostPlayed(song.songID)}
            >
              {song.songName}
            </span>
          </div>

          <div className="middle">
            <CommentIcon onClick={() => handleOpenComments(song.songID)} />
          </div>

          {open && (
            <SongComments open={open} selectedSongId={selectedSongId} handleClose={handleClose}/>
          )}

          {Playing && currentlyPlayingSong?.songID === song.songID ? (
            <div className="right">
              <span>
                <img
                  style={{ height: "20px" }}
                  src="../images/visualizer.gif"
                  alt=""
                />
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
