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

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { toast } from "react-hot-toast";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { IconButton, Menu, MenuItem } from "@mui/material";

export default function ListofSongs({ theme }) {
  const { artistID, genreName } = useParams();
  const [artist, setArtist] = useState("");
  const [userid, setUserid] = useState();
  const [playlists, setPlaylists] = useState([]);

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
  const [token, setToken] = useState();
  const [show, setShow] = useState(false);

  const [songs, setSongs] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    let controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v1/getAllPlaylist/${userid}`, {
          signal: controller.signal,
        });
        setPlaylists(response.data);
        controller = null;
      } catch (error) {
        console.log(error);
      }
    };
    if (!isLoggedIN()) return;

    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
    setUserid(getCurrentUserDetail().user.id);
    fetchData();
    return () => controller?.abort();
  }, []);

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
  }, []);

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

  const handleClick = async (songId, playlistId) => {
    try {
      const response = await axios.get(`/v1/getSingleSong/${songId}`);
      const song = response.data[0].song;
      const songName = response.data[0].songName;
      console.log(song);

      const playlistData = {
        playlist_id: playlistId,
        songID: songId,
        song: song,
        songName: songName,
      };

      const res = await axios.post(
        `v1/addSongsToPlaylist/${playlistId}`,
        playlistData,
        config
      );
      console.log(res.data);
      toast.success("Song added!!");
    } catch (error) {
      console.log(error);
      toast.error("Please Try Again!");
    }
    setShow(false);
  };

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

  const handleLikeClicked = async (songId) => {
    if (isLoggedIN()) {
      try {
        const likedData = {
          songID: songId,
          userID: userid,
        };

        const res = await axios.post(`v1/songs/like`, likedData, config);
        console.log(res);
        if (res.status === 201) {
          return;
        } else {
          toast.success("Song added!!");
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    } else {
      toast.error("Please login to like the song");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <FavoriteIcon onClick={() => handleLikeClicked(song.songID)} />
            <IconButton  onClick={handleMenu}>
              <PlaylistAddIcon  />
            </IconButton>
         
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {playlists.map((playlist) => (
                  <MenuItem
                    key={playlist.playlistID}
                    id="text"
                    onClick={() =>
                      handleClick(song.songID, playlist.playlistID)
                    }
                  >
                    {playlist.name}
                  </MenuItem>
                ))}
              </Menu>
          
          </motion.div>
        ))
      )}
    </div>
  );
}
