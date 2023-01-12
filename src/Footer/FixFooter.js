import { useState } from "react";
import "../assets/fixfooter.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const FixFooter = (props) => {
  const [slideUp, setSlideUp] = useState(false);

  return (
    <div className={`fix-footer ${slideUp ? "active" : ""}`}>
      <div onClick={() => setSlideUp(!slideUp)} className="slide-up-btn"></div>

      <div className="d-visibility"></div>

      {slideUp && (
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
      )}

      {!slideUp && (
        <div className="mini-player">
          <div className="flex">
            <div className="artist-cover-img">
              <img src="" alt="" />
            </div>
            <div className="artist-info">
              <p>Beyond the line</p>
              <p>Rizwan Khan</p>
            </div>
          </div>
          <div className="mini-player-control">
            <div className="play-button">
              <PlayCircleIcon className="icon" />
            </div>

            <div className="close-button">
              <CancelIcon className="icon" />
            </div>
          </div>
        </div>
      )}

      <div className="navigation-menu"></div>
    </div>
  );
};

export default FixFooter;
