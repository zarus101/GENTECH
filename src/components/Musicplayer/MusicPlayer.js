import React, { useEffect, useRef, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { styled, Slider } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "../../assets/HomePageMusicPLayer.scss";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

const MusicSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "brown",
  height: 2,
  "&:hover": {
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
    display: props.thumbless ? "none" : "block",
  },
}));

const MusicPlayer = (props) => {
  const [{ allSongs, song,Playing ,currentlyPlayingSong, }, dispatch] =
    useStateValue([]);
    const audioPlayer= useRef();

    const nextTrack = () => {
      if (song > allSongs.length) {
        dispatch({
          type: actionType.SET_SONG,
          song: 0,
        });
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentlyPlayingSong: allSongs[song],
        });
      } else {
        dispatch({
          type: actionType.SET_SONG,
          song: song + 1,
        });
  
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentlyPlayingSong: allSongs[song + 1],
        });
      }
    };
  
    const previousTrack = () => {
      if (song === 0) {
        dispatch({
          type: actionType.SET_SONG,
          song: 0,
        });
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentlyPlayingSong: allSongs[song],
        });
      } else {
        dispatch({
          type: actionType.SET_SONG,
          song: song - 1,
        });
  
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentlyPlayingSong: allSongs[song - 1],
        });
      }
    };
  


  return (
    <>
      <audio
        src={`/public/songs/${currentlyPlayingSong?.song}`}
        ref={audioPlayer}
      />

      <div className="home-music-section">
        <div className="mostplayed_header">
          <h2 id="text">Music Player</h2>
        </div>

        <div className="audio-player-lg">
          <div className="audio-cover-lg-img">
            <img
              src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
              alt="cover"
            />
          </div>


          <div className="artist-info">
          <h2>
              {currentlyPlayingSong?.songName.length > 20
                ? currentlyPlayingSong?.songName.slice(0, 20)
                : currentlyPlayingSong?.songName}
            </h2>
            <h3>{currentlyPlayingSong?.artistName}</h3>
          </div>

          <div className="audio-control-buttons">
            <div className="audio-controls">
              <div className="prev-button" onClick={previousTrack}>
                <SkipPreviousIcon className="icon" />
              </div>
              <div className="play-button">
                {Playing ? (
                  <PauseCircleIcon className="icon " />
                ) : (
                  <PlayCircleIcon className="icon " />
                )}
              </div>

              <div className="next-button">
                <SkipNextIcon className="icon" onClick={nextTrack} />
              </div>
            </div>

            <div className="audio-volume">
              {/* <VolumeBtns />
              <MusicSlider
                min={0}
                max={100}
                value={props.volume}
                onChange={(e, v) => props.setVolume(v)}
                sx={{
                  "& .MuiSlider-thumb": {
                    width: 20,
                    height: 20,
                  },
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
