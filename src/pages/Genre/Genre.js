import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Genres.scss";
import { useNavigate } from "react-router-dom";

const Genre = ({ theme }) => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/v1/genre")
      .then((res) => setGenres(res.data))
      .catch((error) => console.error(error));
  }, []);

  const handleClick = (id, e) => {
    e.preventDefault();
    navigate(`/genre/${id}`);
  };
  return (
    <>
      <div className="genre-section">
        <div className="middle-section">
          <div className="wrapper" id={theme}>
            <div className="carousel_header">
              <div className="carousal_title">
                <h3 id="text">All Genres</h3>
              </div>
              <div className="genre-card">
                {genres.map((item) => (
                  <div
                    className="card"
                    key={item.id}
                    onClick={(e) => handleClick(item.id, e)}
                  >
                    <div className="genre_image">
                      <img src={item.src} alt="" />
                    </div>
                    <div className="genre_info">
                      <h4 id="text">{item.genreName}</h4>
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

export default Genre;
