import React, { useEffect, useState } from "react";
import TopArtists from "../../components/Artist/TopArtists";
import "../../assets/Artists.scss";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";

const Artists = ({ theme }) => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setArtists(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (artistID, e) => {
    e.preventDefault();
    navigate(`/artist/${artistID}`);
  };
  return (
    <>
      <div className="artist-section">
        <div className="top-section">
          <TopArtists />
        </div>
        <div className="middle-section">
          <div className="wrapper" id={theme}>
            <div className="carousel_header">
              <div className="carousal_title">
                <h3 id="text">All Artists</h3>
              </div>
              <div className="search-div">
                <form action="" className="search-bar">
                  <input
                    type="search"
                    placeholder="search your artist here"
                    name="seacrh"
                    onChange={(event) => {
                      setSearchItem(event.target.value);
                    }}
                  />
                </form>
              </div>
            </div>
            <div className="artist-card-1">
              {artists
                .filter((item) => {
                  if (searchItem === "") {
                    return item;
                  } else if (
                    item.artistName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className="card"
                      key={item.artistID}
                      onClick={(e) => handleClick(item.artistID, e)}
                    >
                      <div className="artist_image">
                        <img
                          src={`/public/img/artist/${item.artistPhoto}`}
                          alt=""
                        />
                      </div>
                      <div className="artist_info">
                        <h4 id="text">{item.artistName}</h4>
                      </div>
                    </div>
                  );
                })}
              {artists.filter((item) => {
                if (searchItem === "") {
                  return item;
                } else if (
                  item.artistName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                ) {
                  return item;
                }
              }).length === 0 && (
                <div className="card">
                  <div className="not-found-error">
                    <h1>No Artist Found</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <br/>
    </>
  );
};

export default Artists;
