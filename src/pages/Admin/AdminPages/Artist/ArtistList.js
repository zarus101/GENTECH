import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/ArtistList.scss";

import { useNavigate } from "react-router-dom";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "@mui/material/Alert";

import { getCurrentUserDetail } from "../../../../connection/UserService";
import { deleteArtistById } from "../../../../connection/ArtistService";
import { toast } from "react-hot-toast";
import Header from "../../AdminComponents/Header";
import { Box } from "@mui/material";

const ArtistList = () => {
  const [user, setUser] = useState([]);
  const Navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [response] = useState("");
  const [token, setToken] = useState();
  const [searchItem, setSearchItem] = useState("");

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setUser(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, [user]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function deleteArtist(value) {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteArtistById(value.artistID, token)
        .then((res) => {
          console.log(value.artistID);
          toast.success("Artist deleted!!");
        })
        .catch((error) => {
          toast.error("Failed to delete the artist..");
        });
      // window.location.reload(false);
    }
  }

  const handleUpdate = (id, e) => {
    e.preventDefault();
    Navigate(`/updateArtist/${id}`);
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/v1/deleteAllArtist`, config)
        .then((res) => {
          toast.success(" All artist deleted!!");
        })
        .catch((error) => setError(error));
      setShowAlert(true);
    }
  };

  return (
    <>
      <Box m="20px" className="artistlist-section">
        <Box
          className="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="left-part">
            <Header title="All Artists" subtitle="All artists here" />
          </div>
          <div className="search-div">
            <form action="" className="search-bar">
              <input
                type="search"
                placeholder="Search your artist here"
                name="seacrh"
                onChange={(event) => {
                  setSearchItem(event.target.value);
                }}
              />
            </form>
          </div>
        </Box>
        <main>
          {showAlert ? (
            <Alert severity="success" onClose={() => setShowAlert(false)}>
              {error ? `${error}` : `${response}`}
            </Alert>
          ) : (
            ""
          )}

          <button onClick={(e) => handleDeleteAll(e)}>
            <ClearIcon sx={{ color: red[900] }} />
          </button>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Artist ID</th>
                  <th>Artist Name</th>
                  <th>Artist Bio</th>
                  <th>Artist Year</th>
                  <th>Artist Status</th>
                  <th>Artist Pic</th>
                  <th>Options</th>
                </tr>
              </thead>
              {user
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.artistName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => {
                  return (
                    <tbody key={value.artistID}>
                      <tr>
                        <td>{value.artistID}</td>
                        <td>{value.artistName}</td>
                        <td>{value.artistBio}</td>
                        <td>{value.year}</td>
                        <td>{value.status}</td>
                        <td>
                          <img
                            src={`/public/img/artist/${value.artistPhoto}`}
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
                              onClick={() => deleteArtist(value)}
                              style={{ cursor: "pointer" }}
                            >
                              <Delete sx={{ color: red[800] }} />
                            </button>
                            <button
                              onClick={(e) => handleUpdate(value.artistID, e)}
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
            </table>
          </div>
        </main>
      </Box>
    </>
  );
};

export default ArtistList;
