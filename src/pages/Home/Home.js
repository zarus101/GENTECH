import React, { useState, useEffect, useRef } from "react";
import TopSongs from "../../components/Song/TopSongs";
import MostPlayed from "../../components/Song/MostPlayed.js";
import "../../assets/home.scss";
import "../../assets/Theme.scss";
import FixFooter from "../../Footer/FixFooter.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer.js";

// import audio from "../../assets/music/test1.mp3";
// import song from "../../assets/music/song.mp3";
import axios from "axios";

const Home = ({ theme, setTheme }) => {
  // const [songs, setSongs] = useState(allsongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  // const [index, setIndex] = useState(0);
  // const [CurrentSong] = useState(audio);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(60);
  // const songs = [audio, song];

  const [songs, setSongs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const audioPlayer = useRef();

  // const fetchSongs = () => {
  //   return axios
  //     .get("/v1/songs")
  //     .then((response) => setSongs(response.data))
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  // fetching our api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/v1/songs");
        let _musics = data;
        console.log(_musics);
        _musics.map((music) => {
          let pload = {
            songName: music.songName,
            artistName: music.artistName,
            src: `/public/songs/${music.song}`,
          };
          setIsLoading(false);
          return setSongs((oldSongs) => [...oldSongs, pload]);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > songs.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }

    return () => {
      subscribed = false;
    };
  }, [currentSongIndex, songs.length]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="home">
        <TopSongs />

        <div className="double_column">
          <div className="left_column">
            <MusicPlayer
              // index={index}
              // setIndex={setIndex}
              // CurrentSong={CurrentSong}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              nextSongIndex={nextSongIndex}
              songs={songs}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              volume={volume}
              setVolume={setVolume}
              audioPlayer={audioPlayer}
            />
          </div>
          <div className="right_column">
            <MostPlayed />
          </div>
        </div>

        <br />
        <br />

        <FixFooter
          // index={index}
          // setIndex={setIndex}
          // CurrentSong={CurrentSong}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          songs={songs}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          setVolume={setVolume}
          audioPlayer={audioPlayer}
        />
      </div>
    </>
  );
};

export default Home;
