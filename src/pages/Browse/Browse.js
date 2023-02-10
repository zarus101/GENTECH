import React from "react";
import TopArtists from "../../components/Artist/TopArtists.js";
import TopAlbums from "../../components/Album/TopAlbums";
import TopSongs from "../../components/Song/TopSongs";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/browse.scss"
import { useState } from "react";
import { useEffect } from "react";
import BrowseArtists from "../../components/Artist/BrowseArtist.js";
import BrowseSongs from "../../components/Song/BrowseSongs.js";



const Browse = () => {
  const [searchItem, setSearchItem]= useState("")
useEffect(() => {


 
}, [])

  return (
    <>
    <div className="search-component">
      <div className="top-side">
        <div className="container">
          <form action="" className="search-bar">
            <input
              type="search"
              placeholder="search songs and artists"
              name="seacrh"
              onChange={(event)=>{setSearchItem(event.target.value)}}
            />
            
          </form>
        </div>
      </div>
      </div>
      <div>
        <BrowseSongs searchItem={searchItem} />
        <BrowseArtists searchItem={searchItem}/>
      </div>

      <br/>
      <br/>
      <br/>
    </>
  );
};

export default Browse;
