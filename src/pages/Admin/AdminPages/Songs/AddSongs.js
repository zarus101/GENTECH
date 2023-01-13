import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const AddSongs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="20px">
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

      <form>
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
            label="Song Title"
            name="songTitle"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Artist Name"
            name="artistName"
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
