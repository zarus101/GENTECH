import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import "../../assets/ListofSongs.scss";
import { useEffect } from "react";
import axios from "axios";
import { getMusicByArtistId } from "../../connection/MusicService";
import { useParams } from "react-router-dom";

export default function ListofSongs({ theme }) {
  const { artistID, genreName } = useParams();
  const [artist, setArtist] = useState([]);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (genreName) {
          const response = await axios.get(`/v1/songsByGenre/${genreName}`);
          setSongs(response.data);
        } else if (artistID) {
          getMusicByArtistId(artistID).then((data) => {
            setSongs(data);
            console.log(data);
          });
        }
      } catch (error) {
        if (error.response) {
          // Request made but the server responded with an error
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // Request made but no response is received from the server.
          console.log(error.request);
        } else {
          // Error occured while setting up the request
          console.log("Error", error.message);
        }
      }
    };
    fetchData();
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // console.log(songs);
  }, [artistID, genreName]);

  const [currentSong, setCurrentSong] = useState(null);

  const handleSongPlay = (song) => {
    if (currentSong) {
      currentSong.pause();
    }
    setCurrentSong(song);
  };

  return (
    <div className="songlist" id={theme}>
      <div className="songlist-header">
        <h2 id="text">
          Songs of {artist.artistName ? artist.artistName : genreName}
        </h2>

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
              {/* <span className="primary_text_color">{song.id}</span> */}

              <img
                src={
                  song.coverphoto
                    ? `/public/img/coverphoto/${song.coverphoto}`
                    : "../images/download.jfif"
                }
                alt="song_cover"
              />
              <div className="left-info">
                <span className="primary_text_color">{song.songName}</span>
                <span className="grey_text">{song.artistName}</span>
              </div>
            </div>

            <div className="right">
              <span className="grey_text">{song.Description}</span>
              {/* <span className="grey_text">{props.artist.duration}</span> */}
              <audio
                controls
                onPlay={() => handleSongPlay(this)}
                src={`/public/songs/${song.song}`}
              ></audio>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
