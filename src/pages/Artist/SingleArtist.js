import React from "react";
import { useParams } from "react-router-dom";
import "../../assets/singleArtist.scss";
import ArtistInfo from "../../components/Artist/ArtistInfo";
import MostPlayed from "../../components/Song/MostPlayed.js";
import TopSongs from "../../components/Song/TopSongs";

const SingleArtist = ({ theme }) => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div className="artist-wrapper" id={theme}>
        <div className="artist-info">
          <ArtistInfo id={id} />
        </div>
        <div className="player-wrapper">
          <div className="player-player"></div>
          <div className="player-mostplayed">
            <MostPlayed />
          </div>
        </div>
      </div>
      <TopSongs />
    </>
  );
};

export default SingleArtist;
