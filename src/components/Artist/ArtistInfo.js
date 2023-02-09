import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assets/ArtistInfo.scss";

export default function ArtistInfo({ theme, artistID }) {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    axios
      .get(`/v1/getSingleArtist/${artistID}`)
      .then((response) => setArtist(response.data[0]))
      .catch((error) => console.error(`Error: ${error}`));
  }, [artistID]);

  return (
    <div className="artist-card" id={theme}>
      <div className="card-image">
        <img src={`/public/img/artist/${artist.artistPhoto}`} alt="Profile" />
        <h2 id="text">{artist.artistName}</h2>
      </div>
      <div className="card-info">
        <p id="text">{artist.artistBio}</p>
        {/* 
        <h4 id="text">Date of Birth:</h4>
        <h4 id="text">Status:</h4>
        <h4 id="text">Major Honors:</h4> */}
      </div>
    </div>
  );
}
