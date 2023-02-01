import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Albums() {
  const [songs, setSongs] = useState([]);

  // const fetchData = () => {
  //   return fetch("/v1/getAllArtist")
  //     .then((response) => response.json())
  //     .then((data) => setUser(data));
  // };

  const fetchData = () => {
    return axios
      .get("/v1/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <h1>Songs List</h1>

      {songs.map((value, index) => (
        <div key={index}>
          <h2>{value.songName}</h2>
          <h2>{value.artistName}</h2>
        </div>
      ))}
    </main>
  );
}
