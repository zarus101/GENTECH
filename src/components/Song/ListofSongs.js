import React, { useState } from "react";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "../../assets/ListofSongs.scss";
import { useEffect } from "react";
import axios from "axios";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { getMusicByArtistId } from "../../connection/MusicService";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

export default function ListofSongs({ theme }) {
  const { artistID, genreName } = useParams();
  const [artist, setArtist] = useState("");
  const [
    {
      currentlyPlayingSong,
      Playing,
      allSongs,
      likedSongs,
      song,
      isSongPlaying,
    },
    dispatch,
  ] = useStateValue();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (genreName) {
          const response = await axios.get(`/v1/songsByGenre/${genreName}`);
          setSongs(response.data);
        } else if (artistID) {
          getMusicByArtistId(artistID).then((data) => {
            setSongs(data);
            console.log(data);
          });
        }
      } catch (error) {
        if (error.response) {
          // Request made but the server responded with an error
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // Request made but no response is received from the server.
          console.log(error.request);
        } else {
          // Error occured while setting up the request
          console.log("Error", error.message);
        }
      }
    };
    fetchData();
    return () => {
      setSongs([]);
    };
  }, [artistID, genreName]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(`/v1/getSingleArtist/${artistID}`);
        setArtist(res.data[0].artistName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtist();
  }, [artistID]);

  const handleMostPlayed = async (id) => {
    try {
      const response = await axios.put(`v1/updateplay/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSongToContext = (index, currentsong) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      });

      if (Playing) {
        try {
          const response = axios.put(`v1/updateplay/${currentsong?.songID}`);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      });
      try {
        const response = axios.put(`v1/updateplay/${currentsong?.songID}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(currentsong);
  };
  return (
    <div className="songlist" id={theme}>
      <div className="songlist-header">
        <h2 id="text">Songs of {artist !== "" ? artist : genreName}</h2>

        <p className="grey_text">
          Number of songs: {songs.length}
          <ArrowCircleDownIcon className="arrowdown" />
        </p>
      </div>

      {songs.length === 0 ? (
        <div className="no-songs">No songs available</div>
      ) : (
        songs.slice(0, 5).map((song, index) => (
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
                <PauseCircleIcon className="grey_text" />
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

            {Playing && currentlyPlayingSong?.songID === song.songID ? (
              <div className="right">
                <span>
                  <img
                    style={{ height: "40px" }}
                    src="../images/visualizer.gif"
                    alt=""
                  />
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
}
