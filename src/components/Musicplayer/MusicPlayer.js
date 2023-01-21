// import React, { useRef, useState } from "react";
// import PlayCircleIcon from "@mui/icons-material/PlayCircle";
// import PauseCircleIcon from "@mui/icons-material/PauseCircle";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
// import "../../assets/HomePageMusicPLayer.scss";

// const MusicPlayer = (props, { theme }) => {
//   const audioElement = useRef(null);

//   const SkipSong = (forwards = true) => {
//     if (forwards) {
//       props.setCurrentSongIndex(() => {
//         let temp = props.currentSongIndex;
//         temp++;

//         if (temp > props.songs.length - 1) {
//           temp = 0;
//         }

//         return temp;
//       });
//     } else {
//       props.setCurrentSongIndex(() => {
//         let temp = props.currentSongIndex;
//         temp--;

//         if (temp < 0) {
//           temp = props.songs.length - 1;
//         }

//         return temp;
//       });
//     }
//   };

//   const [range, setRange] = useState(0);

//   const handleChange = (e) => {
//     e.preventDefault();
//     return setRange(audioElement.current.currentTime);
//   };

//   return (
//     <>
//       <div className="home-music-section" id={theme}>
//         <div className="mostplayed_header">
//           <h2 id="text">Music Player</h2>
//         </div>

//         <audio
//           src={props.songs[props.currentSongIndex].src}
//           ref={audioElement}
//         ></audio>

//         <div className="audio-player-lg">
//           <div className="audio-cover-lg-img">
//             <img
//               src={props.songs[props.currentSongIndex].img_src}
//               alt={props.songs[props.currentSongIndex].title}
//             />
//           </div>

//           <div className="artist-info">
//             <h2>{props.songs[props.currentSongIndex].title}</h2>
//             <h3>{props.songs[props.currentSongIndex].artist}</h3>
//           </div>

//           <div className="audio-music-progress">
//             <input
//               type="range"
//               min={"0"}
//               max={"100"}
//               value={range}
//               onChange={(e) => handleChange(e)}
//             />
//           </div>

//           <div className="audio-control-buttons">
//             <div className="prev-button" onClick={() => SkipSong(false)}>
//               <SkipPreviousIcon className="icon" />
//             </div>
//             <div
//               className="play-button"
//               onClick={() => props.setIsPlaying(!props.isPlaying)}
//             >
//               {props.isPlaying ? (
//                 <PauseCircleIcon className="icon " />
//               ) : (
//                 <PlayCircleIcon className="icon " />
//               )}
//             </div>
//             <div className="next-button" onClick={() => SkipSong()}>
//               <SkipNextIcon className="icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MusicPlayer;
