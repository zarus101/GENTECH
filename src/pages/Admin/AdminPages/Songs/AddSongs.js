import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import axios from "axios";

const AddSongs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // var bodyFormData = new FormData();

    // bodyFormData.append("songID", inputs.songID);
    // bodyFormData.append("songName", inputs.songName);
    // bodyFormData.append("Description", inputs.Description);
    // bodyFormData.append("songDuration", inputs.songDuration);
    // bodyFormData.append("genreID", inputs.genreID);
    // bodyFormData.append("dateAdded", inputs.dateAdded);
    // bodyFormData.append("artistID", inputs.artistID);
    // axios({
    //   method: "post",
    //   url: "/v1/addSong",
    //   data: bodyFormData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })

    const songData = {
      songID: inputs.songID,
      songName: inputs.songName,
      Description: inputs.Description,
      songDuration: inputs.songDuration,
      genreID: inputs.genreID,
      dateAdded: inputs.dateAdded,
      artistID: inputs.artistID,
    };
    axios
      .post("/v1/addSong", songData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    console.log(inputs);
  };

  return (
    <Box m="20px">
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Song ID"
            name="songID"
            value={inputs.songID || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Song Name"
            name="songName"
            value={inputs.songName || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            multiline
            variant="filled"
            type="text"
            rows={4}
            label="Song Description"
            name="Description"
            value={inputs.Description || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 4" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Song Duration"
            name="songDuration"
            value={inputs.songDuration || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Genre ID"
            name="genreID"
            value={inputs.genreID || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date Added"
            name="dateAdded"
            value={inputs.dateAdded || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Artist ID"
            name="artistID"
            value={inputs.artistID || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <Typography fullWidth sx={{ gridColumn: "span 4" }}>
            Song File
          </Typography>
          <TextField
            fullWidth
            type="file"
            name="song"
            sx={{ gridColumn: "span 4" }}
          />

          <Typography fullWidth sx={{ gridColumn: "span 4" }}>
            Song Cover Photo
          </Typography>
          <TextField
            fullWidth
            type="file"
            name="coverphoto"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Add Song
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddSongs;
