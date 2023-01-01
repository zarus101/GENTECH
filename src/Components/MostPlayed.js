import React, { useState } from "react";
import bestArtists from "../Data/artistsData";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

import "../Assests/MostPlayed.scss";

export default function MostPlayed({ theme }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (index) => {
    setIsActive((current) => !current);
  };
  return (
    <div className="mostplayed" id={theme}>
      <div className="mostplayed_header">
        <h2 id="text">
          Mostly Played <FavoriteIcon className="favouriteicon" />
        </h2>

        <p className="grey_text">
          55 songs in the list <ArrowCircleDownIcon className="arrowdown" />
        </p>
      </div>
 
      {bestArtists.slice(0, 5).map((artist, index) => (
        <div
          className={
            isActive ? "mostplayed_element_play" : "mostplayed_element_stop"
          }
          onClick={() => {
            handleClick(index);
          }}
          key={index}
        >
          <div className="left">
            <span className="primary_text_color">{artist.id}</span>

            <img src={artist.src} alt="artists" />

            <PlayArrowIcon className="grey_text" />

            <span className="primary_text_color">{artist.title}</span>
          </div>

          <div className="right">
            <span className="grey_text">{artist.name}</span>
            <span className="grey_text">{artist.duration}</span>

            <span>
              <img src="./images/visualizer.gif" alt="" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
