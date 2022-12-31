import React from "react";
import TopArtists from "../Components/TopArtists.js";
import TopSongs from "../Components/TopSongs";
import TopAlbums from "../Components/TopAlbums";

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
