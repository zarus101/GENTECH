import React from "react";
import "../../assets/ArtistInfo.scss";

export default function ArtistInfo({ theme }) {
  return (
    <div className="artist-card" id={theme}>
      <div className="card-image">
        <img src="../images/artists/1.jpg" alt="Profile" />
        <h2 id="text">Adele</h2>
      </div>
      <div className="card-info">
        <p id="text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia,
          sit sequi. Optio reprehenderit similique, quae, quisquam doloremque
          sequi eveniet aliquid officiis blanditiis magnam vero, veritatis vitae
          provident quos id beatae?
        </p>
        {/* 
        <h4 id="text">Date of Birth:</h4>
        <h4 id="text">Status:</h4>
        <h4 id="text">Major Honors:</h4> */}
      </div>
    </div>
  );
}
