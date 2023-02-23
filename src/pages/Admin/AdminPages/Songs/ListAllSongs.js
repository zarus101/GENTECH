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
import { Delete, Edit } from "@mui/icons-material";
import {
  deleteSongById,
  getAllMusic,
} from "../../../../connection/MusicService";

const ListAllSongs = () => {
  const [songs, setSongs] = useState([]);
  const Navigate = useNavigate();

  // const [showAlert, setShowAlert] = useState(false);
  // const [error, setError] = useState("");
  // const [response, setResponse] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [token, setToken] = useState();

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
    // window.location.reload(false);
    // const newSongs = await getAllMusic();
    // setSongs([...songs]);
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

  //   const handleDeleteAll = (e) => {
  //     e.preventDefault();
  //     if (window.confirm("Are you sure you want to delete?")) {
  //       axios
  //         .delete(`/v1/deleteAllArtist`, config)
  //         .then((res) => {
  //           toast.success(" All artist deleted!!");
  //         })
  //         .catch((error) => setError(error));
  //       setShowAlert(true);
  //     }
  //   };

  return (
    <>
      <Box m="20px" className="songlist-section">
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
        <main>
          <button>
            <ClearIcon
              sx={{ color: red[900] }}
              onClick={() => deleteAllSong()}
            />
          </button>
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
          </div>
        </main>
      </Box>
    </>
  );
};

export default ListAllSongs;
