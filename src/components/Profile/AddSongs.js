import axios from "axios";
import React, { useState, useEffect } from "react";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import "../../assets/addSongs.scss";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MenuItem } from "react-pro-sidebar";
import { Menu } from "@mui/material";
import { toast } from "react-hot-toast";

export default function AddSongs() {
  const [token, setToken] = useState();
  const [userid, setUserid] = useState();
  const [{ isSongPlaying, song, allSongs, likedSongs }, dispatch] =
    useStateValue([]);
  const [likedSong, setLikedSongs] = useState([]);
  const [likedData, setLikedData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

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
    return () => controller?.abort();
  }, [userid, likedSong]);

  useEffect(() => {
    if (!isLoggedIN()) return;

    getCurrentUserDetail();
    const id = getCurrentUserDetail().user.id;
    setUserid(id);
    setToken(getCurrentUserDetail().token);
  }, []);

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
    }
    console.log(currentsong);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRemove = (songID) => {
    console.log(songID);
    const likedDataItem = likedData.find((data) => data.songID === songID);
    const id = likedDataItem?.id; // Access the id property of the found object
    console.log(id);

    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios.delete(`/v1/deleteLiked/${id}`, config).then((res) => {
          // Remove the entry from likedData

          const newLikedData = likedData.filter((data) => data.songID !== id);

          // Update the likedSongIds and likedSongs states
          const newLikedSongIds = newLikedData.map((data) => data.songID);
          const newFilteredLikedSongs = allSongs.filter((song) =>
            newLikedSongIds.includes(song.songID)
          );
          dispatch({
            type: actionType.SET_LIKED_SONGS,
            likedSongs: newFilteredLikedSongs,
          });
          setLikedSongs(newFilteredLikedSongs);
          setLikedData(newLikedData);
          setAnchorEl(null);

          toast.success("Successfully Removed From Liked List!!");
        });
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    const likedSongIds = likedData.map((data) => data.songID);
    const filteredLikedSongs = allSongs.filter((song) =>
      likedSongIds.includes(song.songID)
    );

    dispatch({
      type: actionType.SET_LIKED_SONGS,
      likedSongs: filteredLikedSongs,
    });
    setLikedSongs(filteredLikedSongs);
  }, [allSongs, likedData, dispatch]);

  return (
    <>
      {likedSong.length > 0 ? (
        <>
          {likedSong.slice(0, 5).map((song, index) => (
            <motion.div
              initial={{ opacity: 0, translateY: -50 }}
              animate={{ opacity: 1, translateY: 0 }}
              onTap={{}}
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
              <MoreVertIcon onClick={handleMenu} />
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
                <MenuItem
                  className="remove_menu_item"
                  onClick={() => handleRemove(song.songID)}
                >
                  Remove From Liked List
                </MenuItem>
              </Menu>
            </motion.div>
          ))}
        </>
      ) : (
        <h1>No songs added</h1>
      )}
    </>
  );
}
