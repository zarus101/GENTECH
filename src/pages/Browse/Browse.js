import React from "react";
import TopArtists from "../../components/Artist/TopArtists.js";
import TopAlbums from "../../components/Album/TopAlbums";
import TopSongs from "../../components/Song/TopSongs";

const Browse = () => {
  return (
    <>
      <div>
        <TopSongs />
        <TopArtists />
        <TopAlbums />
      </div>
    </>
  );
};

export default Browse;
