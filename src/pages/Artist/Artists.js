import React from "react";
import { SwiperSlide } from "swiper/react";
import TopArtists from "../../components/Artist/TopArtists";
import "../../assets/Artists.scss";
import bestArtists from "../../services/artistsData";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const Artists = ({ theme }) => {
  const navigate = useNavigate();
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
                  <NavLink to={"/artist/{item.id}"}>
                    <div className="card" key={item.id}>
                      <div className="artist_image">
                        <img src={item.src} alt="" />
                      </div>
                      <div className="artist_info">
                        <h5 id="text">{item.name}</h5>
                        <h6>{item.title}</h6>
                      </div>
                    </div>
                  </NavLink>
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
