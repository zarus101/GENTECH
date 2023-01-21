import React, { useEffect, useState } from "react";
import axios from "axios";

const Genre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get("/v1/genre")
      .then((res) => setGenres(res.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      {genres.map((genre) => (
        <div>{genre.genreName}</div>
      ))}
    </div>
  );
};

export default Genre;
