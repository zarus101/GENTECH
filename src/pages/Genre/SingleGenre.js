import React from "react";
import { useParams } from "react-router-dom";
import "../../assets/singleGenre.scss";
import ListofSongs from "../../components/Song/ListofSongs";
import TopSongs from "../../components/Song/TopSongs";

const SingleGenre = ({ theme }) => {
  const { genreName } = useParams();

  return (
    <>
      <div className="genre-wrapper" id={theme}>
        <div className="card">
          <div className="genre-name">
            <h2 id="text">{genreName}</h2>
          </div>
        </div>
        <div className="genre-songs">
          <ListofSongs />
        </div>
      </div>
      <TopSongs />
    </>
  );
};

export default SingleGenre;
