import React, { useEffect, useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { styled, Slider } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "../../assets/HomePageMusicPLayer.scss";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const SingleSongAudioPLayer = ({ selectedSong }) => {
  const [{ allSongs, song, Playing, currentlyPlayingSong }, dispatch] =
    useStateValue([]);
  const audioPlayer = useRef();

  const handlePlay = (song) => {
    dispatch({
      type: actionType.SET_PLAYING,
      Playing: true,
    });

    dispatch({
      type: actionType.SET_CURRENT_SONG,
      currentlyPlayingSong: song,
    });
  };

  const handlePause = () => {
    dispatch({
      type: actionType.SET_PLAYING,
      Playing: false,
    });
  };

  return (
    <>
      <div className="home-music-section">
        <div className="audio-player-lg">
          <div className="left-side">
            <div className="audio-cover-lg-img">
              <img
                src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
                alt="cover"
              />
            </div>
          </div>

          <div className="right-side">
            <div className="artist-info">
              <h2>
                {selectedSong?.songName.length > 20
                  ? selectedSong?.songName.slice(0, 20)
                  : selectedSong?.songName}
              </h2>
              <h3>{selectedSong?.artistName}</h3>
            </div>

            <div className="audio-control-buttons">
              <div className="audio-controls">
                <div className="play-button">
                  {Playing ? (
                    <PauseCircleIcon
                      className="icon "
                      onClick={() => handlePlay(selectedSong)}
                    />
                  ) : (
                    <PlayCircleIcon className="icon " onClick={handlePause} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSongAudioPLayer;
