import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Header from "../../AdminComponents/Header";
import "../../../../assets/AdminSongList.scss"
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import { toast } from "react-hot-toast";
import { Delete, Edit } from "@mui/icons-material";
import {
  deleteSongById,
  getAllMusic,
} from "../../../../connection/MusicService";

const ListAllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [token, setToken] = useState();

  const fetchData = async () => {
    getAllMusic()
      .then((data) => {
        setSongs(data);
        console.log(data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  useEffect(() => {
    fetchData();
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const deleteSong = async (value) => {
    deleteSongById(value.songID, token)
      .then((res) => {
        console.log(value.id);
        toast.success("song deleted!!");
      })
      .catch((error) => {
        toast.error("failed to delete the song..");
      });

    const newSongs = await getAllMusic.json();
    setSongs((oldSongs) => [...oldSongs, newSongs]);
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
  //   const handleUpdate = (id, e) => {
  //     e.preventDefault();
  //     Navigate(`/UpdateArtist/${id}`);
  //   };

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
        <Box className="header" display="flex" justifyContent="space-between" alignItems="center">
          <div className="left-part">
          <Header title="List of All Songs" subtitle="add new artist here" />
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
            <ClearIcon sx={{ color: red[900] }} />
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
                  <th>Song</th>
                  <th>Options</th>
                </tr>
              </thead>
              {songs
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.songName.toLowerCase().includes(searchItem.toLowerCase())
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
                          {/* <File
                    src={`/public/img/artist/${value.song}`}
                    alt="Artist"
                    width="100px"
                    loading="lazy"
                  /> */}
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
                              onClick={() => deleteAllSong()}
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
                  item.songName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
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
