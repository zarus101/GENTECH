import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/Playlist.scss";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Playlist = ({ theme, searchItem }) => {
  const { playlistID } = useParams();
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [updateName, setUpdateName] = useState("");
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
  const [userid, setUserid] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let controller = new AbortController();
    const getPlaylist = async () => {
      // setIsLoading(true);
      try {
        const response = await axios.get(
          `/v1/getSinglePlaylist/${playlistID}`,
          {
            signal: controller.signal,
          }
        );
        // console.log(response.data);
        setPlaylistSongs(response.data);
        controller = null;

        const res = await axios.get(`/v1/getAPlaylist/${playlistID}`);
        setPlaylistName(res.data[0].name);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
        // setIsLoading(false);
      }
    };
    getPlaylist();
    return () => controller?.abort();
  }, [playlistID, playlistSongs, playlistName]);

  useEffect(() => {
    if (!isLoggedIN()) return;

    getCurrentUserDetail();
    const id = getCurrentUserDetail().user.id;
    setUserid(id);
    setToken(getCurrentUserDetail().token);
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDelete = (id, song) => {
    console.log(id, song);
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete(
            `/v1/deleteSongFromPlaylist?playlist_id=${id}&song=${song}`,
            config
          )
          .then((res) => toast.success("Song deleted!!"));
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    const playlistData = {
      playlistName: updateName,
      userID: userid,
    };

    try {
      const response = await axios.put(
        `/v1/updateplaylist/${playlistID}`,
        playlistData,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setPlaylistName("");
    setUpdateName("");
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
      try {
        const response = axios.put(`v1/updateplay/${currentsong?.songID}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
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

  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="container" id={theme}>
        <div className="header">
          <img src="../images/download.jfif" alt="Playlist cover" />
          <div className="header-info">
            <h2 id="text">
              {playlistName && playlistName}{" "}
              <Edit
                sx={{
                  border: "1px solid gray",
                  color: "gray",
                  borderRadius: "5px",
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                onClick={handleOpen}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <TextField
                      id="outlined-basic"
                      label="Name your playlist"
                      variant="outlined"
                      name="playlistName"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      sx={{ height: "50px", mt: "2px", ml: "10px" }}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </Typography>
                </Box>
              </Modal>
            </h2>
            <h3 id="text">
              Total Songs:{" "}
              <span style={{ color: "red" }}>{playlistSongs.length}</span>
            </h3>
          </div>
        </div>
        {/* {console.log(playlistSongs[0].name)} */}
        {/* {playlistSongs.map((item) => (
          <div>{item.songName}</div>
        ))} */}
        <div className="body">
          {playlistSongs &&
            playlistSongs.map((song, index) => (
              <div
                className="song"
                id="text"
                key={index}
                onClick={() => addSongToContext(song.songID, song)}
              >
                <div className="song-left">
                  <img
                    src={
                      song.coverphoto
                        ? `/public/img/coverphoto/${song.coverphoto}`
                        : "../images/download.jfif"
                    }
                    style={{ height: "50px", borderRadius: "5px" }}
                    alt="artists"
                  />

                  {Playing && currentlyPlayingSong?.songID === song.songID ? (
                    <PauseCircleIcon className="grey_text" />
                  ) : (
                    <PlayCircleIcon className="grey_text" />
                  )}

                  <span className="primary_text_color">{song.songName}</span>
                </div>

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
                <span>
                  <Delete
                    className="delete-icon"
                    onClick={() => handleDelete(song.playlistID, song.song)}
                  />
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Playlist;
