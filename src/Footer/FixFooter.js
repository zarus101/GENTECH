import { useState, useEffect } from "react";
import "../assets/fixfooter.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import CancelIcon from "@mui/icons-material/Cancel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

import { styled, Slider } from "@mui/material";

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

const FixFooter = (props) => {
  const [slideUp, setSlideUp] = useState(false);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (props.isPlaying) {
        props.audioPlayer.current.play();
      } else {
        props.audioPlayer.current.pause();
      }
    }

    if (props.isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(props.audioPlayer?.current?.duration);
        const _elapsed = Math.floor(props.audioPlayer?.current?.currentTime);

        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {
      subscribed = false;
    };
  });

  function VolumeBtns() {
    return mute || props.volume === 0 ? (
      <VolumeOffIcon
        sx={{ color: "red", "&:hover": { color: "black" } }}
        onClick={() => setMute(!mute)}
      />
    ) : props.volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "red", "&:hover": { color: "black" } }}
        onClick={() => setMute(!mute)}
      />
    ) : props.volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "brown", "&:hover": { color: "black" } }}
        onClick={() => setMute(!mute)}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "brown", "&:hover": { color: "black" } }}
        onClick={() => setMute(!mute)}
      />
    );
  }

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
        src={props.songs[props.currentSongIndex]}
        ref={props.audioPlayer}
      ></audio>

      {slideUp && (
        <div className="audio-player-lg">
          <div className="audio-cover-lg-img">
            <img
              src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
              alt="SOng Cover"
            />
          </div>

          <div className="audio-music-progress">
            <MusicSlider
              value={elapsed}
              max={duration}
              sx={{
                "& .MuiSlider-track": {
                  height: "10px",
                },
              }}
            />
          </div>

          <div className="artist-info">
            <h2>Don't Let Me Down </h2>
            <h3>The Chainsmokers </h3>
          </div>

          <div className="audio-control-buttons">
            <div className="audio-controls">
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

            <div className="audio-volume">
              <VolumeBtns />
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
              />
            </div>
          </div>
        </div>
      )}

      {!slideUp && (
        <div className="mini-player">
          <div className="flex">
            <div className="artist-cover-img">
              {/* <img
                src={props.songs[props.currentSongIndex].img_src}
                alt={props.songs[props.currentSongIndex].title}
              /> */}

              <img
                src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
                alt="'Song Cover"
              />
            </div>
            <div className="artist-info">
              {/* <p>{props.songs[props.currentSongIndex].title}</p>
              <p>{props.songs[props.currentSongIndex].artist}</p> */}

              <p>Don't Let Me Down </p>
              <p>The Chainsmokers </p>
            </div>
          </div>

          <div className="audio-music-progress">
            <MusicSlider
              value={elapsed}
              max={duration}
              sx={{
                "& .MuiSlider-track": {
                  height: "10px",
                },
              }}
            />
          </div>

          <div className="mini-player-control">
            <div className="audio-volume">
              <VolumeBtns />
              <MusicSlider
                min={0}
                max={100}
                value={props.volume}
                onChange={(e, v) => props.setVolume(v)}
              />
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
