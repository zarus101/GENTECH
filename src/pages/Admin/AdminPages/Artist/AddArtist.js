import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";

import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import { toast } from "react-hot-toast";

const AddArtist = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");

  const [token, setToken] = useState();

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    // console.log(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const artistData = {
      // artistID: inputs.artistID,
      artistName: inputs.artistName,
      artistBio: inputs.artistBio,
      year: inputs.year,
      artistPhoto: file,
      status: inputs.status,
    };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("v1/createArtist", artistData, config)
      .then((response) => {
        setResponse(response.data);
        toast.success("Successful");
      })
      .catch((error) => setError(error));

    console.log(artistData);
    setInputs({});
    setShowAlert(true);
  };

  return (
    <>
      {showAlert ? (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          {error ? `${error}` : `${response}`}
        </Alert>
      ) : (
        ""
      )}
      <Box m="20px 20px 200px 20px">
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
              sx={{ gridColumn: "span 2" }}
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

            <TextField
              variant="filled"
              type="text"
              label="Status"
              name="status"
              value={inputs.status || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 2" }}
            />

            <Typography fullWidth sx={{ gridColumn: "span 4" }}>
              Artist Photo
            </Typography>
            <TextField
              type="file"
              name="artistPhoto"
              onChange={handleFile}
              sx={{ gridColumn: "span 4" }}
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
