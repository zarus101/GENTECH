import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "../../assets/ListofSongs.scss";
import { useEffect } from "react";
import axios from "axios";
import { getMusicByArtistId } from "../../connection/MusicService";
import { useParams } from "react-router-dom";

export default function ListofSongs({ theme }) {
  const { artistID } = useParams();
  const [artist, setArtist] = useState([]);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getMusicByArtistId(artistID)
      .then((data) => {
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(songs);
  }, []);

  useEffect(() => {
    axios
      .get(`/v1/getSingleArtist/${artistID}`)
      .then((response) => setArtist(response.data[0]))
      .catch((error) => console.error(`Error: ${error}`));
  }, [artistID]);

  return (
    <div className="songlist" id={theme}>
      <div className="songlist-header">
        <h2 id="text">Songs of {artist.artistName} </h2>

        <p className="grey_text">
          Number of songs:
          <ArrowCircleDownIcon className="arrowdown" />
        </p>
      </div>

      {songs.length === 0 ? (
        <div className="no-songs">No songs available</div>
      ) : (
        songs.slice(0, 5).map((song, index) => (
          <div className="songlist-element" key={index}>
            <div className="left">
              <span className="primary_text_color">{song.id}</span>

              <img src={song.coverImage} alt="song_cover" />
              <span className="primary_text_color">{song.songName}</span>
            </div>

            <div className="right">
              <span className="grey_text">{song.Description}</span>
              {/* <span className="grey_text">{artist.duration}</span> */}
              <audio controls src={`/public/songs/${song.song}`}></audio>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
