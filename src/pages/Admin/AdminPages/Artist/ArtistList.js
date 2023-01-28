import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/ArtistList.scss";

import { useNavigate } from "react-router-dom";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "@mui/material/Alert";

const ArtistList = () => {
  const [user, setUser] = useState([]);
  const Navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setUser(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id, e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/v1/deleteArtist/${id}`)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
      setShowAlert(true);
    }
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    Navigate(`/UpdateArtist/${id}`);
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/v1/deleteAllArtist`)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
      setShowAlert(true);
    }
  };

  return (
    <main>
      {showAlert ? (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          Delete Successful!
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
          {user.map((value, index) => (
            <tbody>
              <tr key={index}>
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
                      onClick={(e) => handleDelete(value.artistID, e)}
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
          ))}
        </table>
      </div>
    </main>
  );
};

export default ArtistList;
