import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Albums() {
  const [user, setUser] = useState([]);

  // const fetchData = () => {
  //   return fetch("/v1/getAllArtist")
  //     .then((response) => response.json())
  //     .then((data) => setUser(data));
  // };

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setUser(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <h1>User List</h1>

      {user.map((value, index) => (
        <div key={index}>
          <h2>{value.artistName}</h2>
          <h2>{value.artistBio}</h2>
        </div>
      ))}
    </main>
  );
}
