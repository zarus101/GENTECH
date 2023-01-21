import { useState, useRef, useEffect } from "react";
import "../assets/fixfooter.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import CancelIcon from "@mui/icons-material/Cancel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const FixFooter = (props) => {
  const [slideUp, setSlideUp] = useState(false);

  const audioElement = useRef(null);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (props.isPlaying) {
        audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }

    return () => {
      subscribed = false;
    };
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div className={`fix-footer ${slideUp ? "active" : ""}`}>
      <div onClick={() => setSlideUp(!slideUp)} className="slide-up-btn"></div>

      <div className="d-visibility"></div>

      <audio
        src={props.songs[props.currentSongIndex].src}
        ref={audioElement}
      ></audio>

      {slideUp && (
        <div className="audio-player-lg">
          <div className="audio-cover-lg-img">
            <img
              src={props.songs[props.currentSongIndex].img_src}
              alt={props.songs[props.currentSongIndex].title}
            />
          </div>

          <div className="artist-info">
            <h2>{props.songs[props.currentSongIndex].title}</h2>
            <h3>{props.songs[props.currentSongIndex].artist}</h3>
          </div>

          <div className="audio-music-progress">
            <input type="range" min={"0"} max={"100"} />
          </div>

          <div className="audio-control-buttons">
            <div className="prev-button" onClick={() => SkipSong(false)}>
              <SkipPreviousIcon className="icon" />
            </div>
            <div
              className="play-button"
              onClick={() => props.setIsPlaying(!props.isPlaying)}
            >
              {props.isPlaying ? (
                <PauseCircleIcon className="icon " />
              ) : (
                <PlayCircleIcon className="icon " />
              )}
            </div>
            <div className="next-button" onClick={() => SkipSong()}>
              <SkipNextIcon className="icon" />
            </div>
          </div>
        </div>
      )}

      {!slideUp && (
        <div className="mini-player">
          <div className="flex">
            <div className="artist-cover-img">
              <img
                src={props.songs[props.currentSongIndex].img_src}
                alt={props.songs[props.currentSongIndex].title}
              />
            </div>
            <div className="artist-info">
              <p>{props.songs[props.currentSongIndex].title}</p>
              <p>{props.songs[props.currentSongIndex].artist}</p>
            </div>
          </div>
          <div className="mini-player-control">
            <div className="audio-control-buttons">
              <div className="prev-button" onClick={() => SkipSong(false)}>
                <SkipPreviousIcon className="icon" />
              </div>
              <div
                className="play-button"
                onClick={() => props.setIsPlaying(!props.isPlaying)}
              >
                {props.isPlaying ? (
                  <PauseCircleIcon className="icon " />
                ) : (
                  <PlayCircleIcon className="icon " />
                )}
              </div>
              <div className="next-button" onClick={() => SkipSong()}>
                <SkipNextIcon className="icon" />
              </div>
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
