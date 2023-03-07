import React, { useEffect, useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCurrentUserDetail } from "../../../../connection/UserService";

import axios from "axios";
import { toast } from "react-hot-toast";

const AddGenre = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const [token, setToken] = useState();

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const config = {
    headers: {
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

    const genreData = {
      // genreID: inputs.genreID,
      genreName: inputs.genreName,
      Description: inputs.Description,
      // artistID: inputs.artistID,
    };

    axios
      .post("/v1/addGenre", genreData, config)
      .then((response) => {
        setResponse(response);
        toast.success(" Genre added successfully!!");
      })
      .catch((error) => toast.error("Error!!"));

    setInputs({});
    setShowAlert(true);
  };

  return (
    <>
      {/* {showAlert ? (
        <Alert severity="success" onClose={() => setShowAlert(false)}>
          {error ? `${error}` : `${response}`}
        </Alert>
      ) : (
        ""
      )} */}
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
              type="number"
              label="Genre ID"
              name="genreID"
              value={inputs.genreID || ""}
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
              multiline
              variant="filled"
              type="text"
              label="Genre Description"
              rows={4}
              name="Description"
              value={inputs.Description || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />

            {/* <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Artist ID"
              name="artistID"
              value={inputs.artistID || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            /> */}
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Add New Genre
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddGenre;
