import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../../../assets/ArtistList.scss";

import { useNavigate } from "react-router-dom";

import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import Clear from "@mui/icons-material/ClearAllOutlined";

const ArtistList = () => {
  const [user, setUser] = useState([]);
  const Navigate = useNavigate();

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
    }
    Navigate("/artistslist");
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
    }
  };

  return (
    <main>
      <button onClick={(e) => handleDeleteAll(e)}>
        <Clear sx={{ color: red[900] }} />
      </button>
      <table>
        <thead>
          <tr>
            <th>Artist ID</th>
            <th>Artist Name</th>
            <th>Artist Bio</th>
            <th>Artist Year</th>
            <th>Artist Status</th>
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
                <button onClick={(e) => handleDelete(value.artistID, e)}>
                  <Delete sx={{ color: red[800] }} />
                </button>
                <button onClick={(e) => handleUpdate(value.artistID, e)}>
                  <Edit color="primary" />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </main>
  );
};

export default ArtistList;
