import React, { useState, useEffect, useRef } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import {
  styled, Slider,

} from '@mui/material';
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "../../assets/HomePageMusicPLayer.scss";
import audio from '../../assets/music/test1.mp3';
import song from "../../assets/music/song.mp3";


const MusicSlider = styled(Slider)(({theme, ...props}) => ({
  color: "brown",
  height: 2,
  '&:hover': {
      cursor: 'auto',
  },
  '& .MuiSlider-thumb': {
      width: '13px',
      height: '13px',
      display: props.thumbless ? 'none' : 'block',
  }
}))

const playlist = [audio, song];

const MusicPlayer = () => {
  const audioPlayer=useRef();
  const [index, setIndex] = useState(0);
  const [CurrentSong]=useState(audio);
  const [isPlaying, setIsPlaying]=useState(false);
  const [volume, setVolume]= useState(30);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(()=>{
    if(audioPlayer){
      audioPlayer.current.volume=volume/100;
    }
    if(isPlaying){
      setInterval(() => {
          const _duration = Math.floor(audioPlayer?.current?.duration);
          const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

          setDuration(_duration);
          setElapsed(_elapsed);
      }, 100);
  }

},[
  volume, isPlaying
]);

  const togglePlay=()=>{
    if(!isPlaying){
    
     audioPlayer.current.play(); 
    }
    else{
      audioPlayer.current.pause();
    }
    setIsPlaying(prev => !prev)
  }

  const toggleSkipForward = () => {
    if(index >= playlist.length - 1) {
        setIndex(0);
        audioPlayer.current.src = playlist[0];
        audioPlayer.current.play();
    } else {
        setIndex(prev => prev + 1);
        audioPlayer.current.src = playlist[index + 1];
        audioPlayer.current.play();
    }
}

const toggleSkipBackward = () => {
    if(index > 0) {
        setIndex(prev => prev - 1);
        audioPlayer.current.src = playlist[index - 1];
        audioPlayer.current.play();
    }
}

  function VolumeBtns(){
    return mute
        ? <VolumeOffIcon sx={{color: 'red', '&:hover': {color: 'black'}}} onClick={() => setMute(!mute)} />
        : volume <= 20 ? <VolumeMuteIcon sx={{color: 'red', '&:hover': {color: 'black'}}} onClick={() => setMute(!mute)} />
        : volume <= 75 ? <VolumeDownIcon sx={{color: 'brown', '&:hover': {color: 'black'}}} onClick={() => setMute(!mute)} />
        : <VolumeUpIcon sx={{color: 'brown', '&:hover': {color: 'black'}}} onClick={() => setMute(!mute)} />
}
  return (
    <>
    <audio src={CurrentSong} ref={audioPlayer}/>
      <div className="home-music-section">
        <div className="mostplayed_header">
          <h2 id="text">Music Player</h2>
        </div>

        <div className="audio-player-lg">
          <div className="audio-cover-lg-img">
            <img src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"/>
          </div>

          <div className="artist-info">
            <h2>Don't Let Me Down </h2>
            <h3>The Chainsmokers  </h3>
          </div>
          <div className="audio-music-progress">
          <MusicSlider value={elapsed} max={duration}
            />        
          </div>
          <div className="audio-volume">
          <VolumeBtns  />
          <MusicSlider min={0} max={100} value={volume}
           onChange={(e, v) => setVolume(v)}
            />
            </div>
          <div className="audio-control-buttons">
         
            <div className="prev-button">
              <SkipPreviousIcon className="icon"
               onClick={toggleSkipBackward}/>
            </div>
            <div className="play-button" >
              {!isPlaying
             ? <PlayCircleIcon className="icon " onClick={togglePlay}/>
             : < PauseCircleIcon className="icon " onClick={togglePlay}/>
              }
             </div>
            <div className="next-button">
              <SkipNextIcon className="icon" onClick={toggleSkipForward}/>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
