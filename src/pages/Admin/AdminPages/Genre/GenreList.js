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
import { toast } from "react-hot-toast";
import Header from "../../AdminComponents/Header";
import { Box } from "@mui/material";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const Navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [token, setToken] = useState();

  const fetchData = () => {
    return axios
      .get("/v1/genre")
      .then((response) => setGenres(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, [genres]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function deleteGenre(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/v1/deleteGenre/${id}`, config)
        .then((res) => {
          console.log(id);
          toast.success("Genre deleted!!");
        })
        .catch((error) => {
          toast.error("Failed to delete the genre..");
        });
    }
  }

  const handleUpdate = (id, e) => {
    e.preventDefault();
    Navigate(`/updateGenre/${id}`);
  };

  const handleDeleteAll = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/v1/deleteAllGenre`, config)
        .then((res) => {
          toast.success(" All genres deleted!!");
        })
        .catch((error) => setError(error));
      setShowAlert(true);
    }
  };

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="All Genres" subtitle="All genres here" />
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
                  <th>Genre ID</th>
                  <th>Genre Name</th>
                  <th>Genre Description</th>
                  <th>Options</th>
                </tr>
              </thead>
              {genres.map((value) => (
                <tbody key={value.genreID}>
                  <tr>
                    <td>{value.genreID}</td>
                    <td>{value.genreName}</td>
                    <td>{value.Description}</td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => deleteGenre(value.genreID)}
                          style={{ cursor: "pointer" }}
                        >
                          <Delete sx={{ color: red[800] }} />
                        </button>
                        <button
                          onClick={(e) => handleUpdate(value.genreID, e)}
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
      </Box>
    </>
  );
};

export default GenreList;
