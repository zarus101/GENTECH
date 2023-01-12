import React from "react";
import TopArtists from "../../components/Artist/TopArtists.js";
import MostPlayed from "../../components/Song/MostPlayed.js";
import '../../assets/home.scss';
import Topbar from "../../components/Navbar/Navbar.js";
import "../../assets/Theme.scss";
import FixFooter from "../../Footer/FixFooter.js";
import MusicPlayer from "../../components/Musicplayer/MusicPlayer.js";


const Home = ({ theme, setTheme }) => {
  return (
    <>
      <div className="home">
      
        <TopArtists />

        <div
          className="double_column"
          
        >
          <div className="left_column">
            <MusicPlayer/>
          </div>
          <div className="right_column">
            <MostPlayed />
          </div>
        </div>

        <br/>

        <FixFooter/>

      </div>
    </>
  );
};

export default Home;
