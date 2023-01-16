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
                <h3 id="text">Top Artists</h3>
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
                      <h5 id="text">{item.name}</h5>
                      <h6>{item.title}</h6>
                    </div>
                  </div>
                ))}

                {/* <div className="card">
                  <div className="artist_image">
                    <img src="./images/artists/1.jpg" alt="" />
                  </div>
                  <div className="artist_info">
                    <h5 id="text">Sagun</h5>
                    <h6>hhh</h6>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
