import React from "react";
import { useParams } from "react-router-dom";
import "../../assets/singleArtist.scss";
import ArtistInfo from "../../components/Artist/ArtistInfo";
import MostPlayed from "../../components/Song/MostPlayed.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer";

const SingleArtist = ({ theme }) => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="artist-wrapper" id={theme}>
      <div className="artist-info">
        <ArtistInfo />
      </div>
      <div className="player-wrapper">
        <div className="player-player">
          <MusicPlayer />
        </div>
        <div className="player-mostplayed">
          <MostPlayed />
        </div>
      </div>
    </div>
  );
};

export default SingleArtist;
