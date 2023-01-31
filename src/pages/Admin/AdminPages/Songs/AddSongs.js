import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";

const AddSongs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");

  const [token, setToken] = useState();

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    // console.log(file);
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const songData = {
      songID: inputs.songID,
      songName: inputs.songName,
      Description: inputs.Description,
      genreName: inputs.genreName,
      dateAdded: inputs.dateAdded,
      artistName: inputs.artistName,
      song: file,
    };
    axios
      .post("/v1/addSong", songData, config)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    setInputs({});
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

          {/* <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Song Duration"
            name="songDuration"
            value={inputs.songDuration || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          /> */}

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Genre Name"
            name="genreName"
            value={inputs.genreName || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="date"
            name="dateAdded"
            value={inputs.dateAdded || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Artist Name"
            name="artistName"
            value={inputs.artistName || ""}
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
            onChange={handleFile}
            sx={{ gridColumn: "span 4" }}
          />

          {/* <Typography fullWidth sx={{ gridColumn: "span 4" }}>
            Song Cover Photo
          </Typography>
          <TextField
            fullWidth
            type="file"
            name="coverphoto"
            sx={{ gridColumn: "span 4" }}
          /> */}
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
