import React, { useEffect, useState } from "react";
import TopArtists from "../../components/Artist/TopArtists";
import "../../assets/Artists.scss";
import bestArtists from "../../services/artistsData";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Artists = ({ theme }) => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setArtists(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id, e) => {
    e.preventDefault();
    navigate(`/artist/${id}`);
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
              <div className="artist-card">
                {artists.map((item) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
