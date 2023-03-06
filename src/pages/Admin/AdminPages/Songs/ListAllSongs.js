import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Header from "../../AdminComponents/Header";
import "../../../../assets/AdminSongList.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import { toast } from "react-hot-toast";
import { Delete, Edit, PlayArrow } from "@mui/icons-material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  deleteSongById,
  getAllMusic,
} from "../../../../connection/MusicService";
import { Button, ButtonBase, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const ListAllSongs = () => {
  const [songs, setSongs] = useState([]);
  const Navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [token, setToken] = useState();
  const [
    { currentlyPlayingSong, allSongs, Playing, song, isSongPlaying },
    dispatch,
  ] = useStateValue();

  const fetchData = async () => {
    await getAllMusic()
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    fetchData();
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, [songs]);

  const deleteSong = async (value) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteSongById(value.songID, token)
        .then((res) => {
          console.log(value.id);
          toast.success("Song deleted!!");
        })
        .catch((error) => {
          toast.error("Failed to delete the song..");
        });
    }
  };

  function deleteAllSong() {
    deleteSongById(token)
      .then((res) => {
        toast.success("All song deleted!!");
      })
      .catch((error) => {
        toast.error("failed to delete the song..");
      });
  }
  const handleUpdate = (id, e) => {
    e.preventDefault();
    Navigate(`/updateSong/${id}`);
  };

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

  return (
    <>
      <Box m="20px 20px 200px 20px" className="songlist-section">
        <main>
          <Box
            className="header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div className="left-part">
              <Header title="List of All Songs" subtitle="All songs here" />
            </div>
            <div className="search-div">
              <form action="" className="search-bar">
                <input
                  type="search"
                  placeholder="search song here"
                  name="seacrh"
                  onChange={(event) => {
                    setSearchItem(event.target.value);
                  }}
                />
              </form>
            </div>
          </Box>
          <button>
            <ClearIcon
              sx={{ color: red[900] }}
              onClick={() => deleteAllSong()}
            />
          </button>
          <Grid item xs={20}>
            <Grid container justifyContent="center" spacing={2}>
              {songs
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.songName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => (
                  <Grid key={value} item>
                    <Paper
                      sx={{
                        p: 2,
                        margin: "auto",
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img
                              alt="complex"
                              src={`/public/img/coverphoto/${value.coverphoto}`}
                            />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                              >
                                <b>Song Name:</b> <span>{value.songName}</span>
                              </Typography>

                              <Typography variant="body2" gutterBottom>
                                Artist Name : <span>{value.artistName}</span>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                Description : <span>{value.Description}</span>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                Genre : <span>{value.genreName}</span>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                Date Added : <span>{value.dateAdded}</span>
                              </Typography>
                              <Grid item className="card_buttons" spacing={1}>
                                <Button
                                  className="play_button"
                                  onClick={() =>
                                    addSongToContext(value.songID, value)
                                  }
                                >
                                  {Playing &&
                                  currentlyPlayingSong?.songID ===
                                    value.songID ? (
                                    <PauseIcon />
                                  ) : (
                                    <PlayArrow />
                                  )}
                                </Button>
                                <Button
                                  className="delete_button"
                                  onClick={() => deleteSong(value)}
                                >
                                  <Delete />
                                </Button>
                                <Button
                                  className="edit_button"
                                  onClick={(e) => handleUpdate(value.songID, e)}
                                >
                                  <Edit />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            className="premium_icon"
                          >
                            {value.song_type === "premium" ? (
                              <WorkspacePremiumIcon />
                            ) : (
                              <div></div>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/*           
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Song ID</th>
                  <th>Song Name</th>
                  <th> Description</th>
                  <th>Genre</th>
                  <th>Date Added</th>
                  <th>Artist Name</th>
                  <th>Cover Photo</th>
                  <th>Options</th>
                </tr>
              </thead>
              {songs
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.songName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => {
                  return (
                    <tbody key={value.songID}>
                      <tr>
                        <td>{value.songID}</td>
                        <td>{value.songName}</td>
                        <td>{value.Description}</td>
                        <td>{value.genreName}</td>
                        <td>{value.dateAdded}</td>
                        <td>{value.artistName}</td>
                        <td>
                          <img
                            src={`/public/img/coverphoto/${value.coverphoto}`}
                            alt="Artist"
                            width="100px"
                            loading="lazy"
                          />
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <button
                              onClick={() => deleteSong(value)}
                              style={{ cursor: "pointer" }}
                            >
                              <Delete sx={{ color: red[800] }} />
                            </button>
                            <button
                              onClick={(e) => handleUpdate(value.songID, e)}
                              style={{ cursor: "pointer", marginLeft: "5px" }}
                            >
                              <Edit color="primary" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              {songs.filter((item) => {
                if (searchItem === "") {
                  return item;
                } else if (
                  item.songName.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return item;
                }
              }).length === 0 && (
                <tbody>
                  <tr>
                    <td> No song found for ' {searchItem} '</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div> */}
        </main>
      </Box>
    </>
  );
};

export default ListAllSongs;
