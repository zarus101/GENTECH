import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import axios from "axios";

const AddArtist = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const artistData = {
      artistName: inputs.artistName,
      artistBio: inputs.artistBio,
      year: inputs.year,
      status: inputs.status,
    };

    axios
      .post("/v1/createArtist", artistData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    console.log(artistData);
    setInputs({});
    alert("Successfully added.");
  };

  return (
    <>
      <Box m="20px">
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Artist ID"
              name="artistID"
              value={inputs.artistID || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 2" }}
            /> */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Artist Name"
              name="artistName"
              value={inputs.artistName || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              multiline
              variant="filled"
              type="text"
              label="Artist Bio"
              rows={4}
              name="artistBio"
              value={inputs.artistBio || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Year"
              name="year"
              value={inputs.year || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 2" }}
            />

            {/* <Typography fullWidth sx={{ gridColumn: "span 4" }}>
              Artist Photo
            </Typography>
            <TextField
              fullWidth
              type="file"
              label="Artist Photo"
              name="artistPhoto"
              value={"inputs.artistPhoto" || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            /> */}

            <TextField
              variant="filled"
              type="text"
              label="Status"
              name="status"
              value={inputs.status || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Artist
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddArtist;
