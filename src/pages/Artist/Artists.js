import React from "react";
import TopArtists from "../../components/Artist/TopArtists";
import "../../assets/Artists.scss";
import bestArtists from "../../services/artistsData";
import { useNavigate } from "react-router-dom";

const Artists = ({ theme }) => {
  const navigate = useNavigate();

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
                {bestArtists.map((item) => (
                  <div
                    className="card"
                    key={item.id}
                    onClick={(e) => handleClick(item.id, e)}
                  >
                    <div className="artist_image">
                      <img src={item.src} alt="" />
                    </div>
                    <div className="artist_info">
                      <h4 id="text">{item.name}</h4>
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
