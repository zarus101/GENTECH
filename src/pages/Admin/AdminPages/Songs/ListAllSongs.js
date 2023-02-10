import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Header from "../../AdminComponents/Header";
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
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="List of All Songs" subtitle="All songs here" />
        </Box>
        <main>
          {/* {showAlert ? (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          {error ? `${error}` : `${response}`}
        </Alert>
      ) : (
        ""
      )} */}

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
              {songs.map((value) => (
                <tbody key={value.artistID}>
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
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                        >
                          <Edit
                            color="primary"
                            onClick={(e) => handleUpdate(value.songID, e)}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </main>
      </Box>
    </>
  );
};

export default ListAllSongs;
