import React, { useState, useEffect } from "react";
import axios from "axios";

const ArtistList = () => {
  const [user, setUser] = useState([]);

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
    if (window.confirm("Are you syre you want to delete?")) {
      axios
        .delete(`/v1/deleteArtist/:${id}`)
        .then((response) => console.log(response))
        .catch((error) => console.error(error));
    }
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
  };

  return (
    <main>
      <table>
        <tr>
          <th>Artist ID</th>
          <th>Artist Name</th>
          <th>Artist Bio</th>
          <th>Artist Year</th>
          <th>Artist Status</th>
          <th>Options</th>
        </tr>
        {user.map((value, index) => (
          <tr key={index}>
            <td>{value.artistID}</td>
            <td>{value.artistName}</td>
            <td>{value.artistBio}</td>
            <td>{value.year}</td>
            <td>{value.status}</td>
            <td>
              <button onClick={(e) => handleDelete(value.artistID, e)}>
                Delete
              </button>
              <button onClick={(e) => handleUpdate(value.artistID, e)}>
                Update
              </button>
            </td>
          </tr>
        ))}
      </table>
    </main>
  );
};

export default ArtistList;
