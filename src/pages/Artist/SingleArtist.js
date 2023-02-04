import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/singleArtist.scss";
import ArtistInfo from "../../components/Artist/ArtistInfo";
import ListofSongs from "../../components/Song/ListofSongs";
import MostPlayed from "../../components/Song/MostPlayed.js";
import TopSongs from "../../components/Song/TopSongs";
import { getMusicByArtistId } from "../../connection/MusicService";

const SingleArtist = ({ theme }) => {
  const { artistID } = useParams();

  return (
    <>
      <div className="artist-wrapper" id={theme}>
        <div className="artist-info">
          <ArtistInfo id={artistID} />
        </div>
        <div className="player-wrapper">
          <div className="player-player"></div>
          <div className="player-mostplayed">
            <ListofSongs  id={artistID} />
          </div>
        </div>
      </div>
      <TopSongs />
    </>
  );
};

export default SingleArtist;
