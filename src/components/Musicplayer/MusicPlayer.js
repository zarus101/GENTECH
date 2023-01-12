import React from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "../../assets/HomePageMusicPLayer.scss";
const MusicPlayer = () => {
  return (
    <>
      <div className="home-music-section">
        <div className="audio-player-lg">
          <div className="audio-cover-lg-img">
            <img />
          </div>

          <div className="artist-info">
            <h2>Beyong the line</h2>
            <h3>Rizwan khan</h3>
          </div>

          <div className="audio-music-progress">
            <input type="range" min={"0"} max={"100"} />
          </div>

          <div className="audio-control-buttons">
            <div className="prev-button">
              <SkipPreviousIcon className="icon" />
            </div>
            <div className="play-button">
              <PlayCircleIcon className="icon " />
            </div>
            <div className="next-button">
              <SkipNextIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
