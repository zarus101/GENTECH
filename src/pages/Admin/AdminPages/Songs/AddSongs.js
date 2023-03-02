import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { getAllArtists } from "../../../../connection/ArtistService";
import { useStateValue } from "../../../../context/StateProvider";

const AddSongs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [{allArtists}, dispatch]= useStateValue();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");
  const [pic, setPic] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  // const [selectedArtist, setSelectedArtist] = useState([]);
  const [token, setToken] = useState();
  const [genres, setGenres] = useState([""]);
  const [artists, setArtists] = useState([]);
  const [singleArtist, setSingleArtist] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const arr = [];
      await axios.get("/v1/genre").then((res) => {
        let result = res.data;

        result.map((genre) => {
          return arr.push({ value: genre.genreName, label: genre.genreName });
        });
        setGenres(arr);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const arr = [];
      allArtists.map((artist) => {
        return arr.push({
          value: artist.artistID,
          label: artist.artistName,
        });
      });
      setArtists(arr);
    };
    getData();
  }, [allArtists]);

  useEffect(() => {
    if (!selectedArtist) return;
    const getData = async () => {
      if (fetching) {
        await axios
          .get(`/v1/getSingleArtist/${selectedArtist}`)
          .then((response) => setSingleArtist(response.data[0].artistName))
          .catch((error) => console.error(`Error: ${error}`));
      }
      setFetching(false);
    };
    getData();
  }, [selectedArtist, fetching]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    // console.log(file);
  };

  const handlePic = (e) => {
    setPic(e.target.files[0]);
    // console.log(pic);
  };

  const handleSelected = (e) => {
    setSelected(Array.isArray(e) ? e.map((x) => x.value) : []);
    console.log(selected);
  };

  const handleSelectedArtist = (e) => {
    setSelectedArtist(e.value);
    console.log(selectedArtist);
  };
  // const handleSelectedArtist = (e) => {
  //   setSelectedArtist(Array.isArray(e) ? e.map((x) => x.value) : []);
  //   console.log(selectedArtist);
  // };

  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filteredOptions = allArtists?.filter((artist) =>
        artist.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 2000);
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
      // songID: inputs.songID,
      songName: inputs.songName,
      Description: inputs.Description,
      genreName: selected,
      dateAdded: inputs.dateAdded,
      artistName: singleArtist,
      song: file,
      coverphoto: pic,
      artistID: selectedArtist,
    };
    axios
      .post("/v1/addSong", songData, config)
      .then((response) => setResponse(response))
      .catch((error) => setError(error));

    setInputs({});
    setFile("");
    setSelected([]);
    setSelectedArtist([]);
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
            {/* <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Song ID"
            name="songID"
            value={inputs.songID || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          /> */}
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

            {/* <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Genre Name"
            name="genreName"
            value={inputs.genreName || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          /> */}

            <Box sx={{ gridColumn: "span 2" }}>
              <Select
                placeholder="Select a genre"
                options={genres}
                onChange={handleSelected}
                value={genres.filter((obj) => selected.includes(obj.value))}
                isMulti
              />
            </Box>

            <Box sx={{ gridColumn: "span 2" }}>
              <AsyncSelect
                cacheOptions
                defaultOptions
                placeholder="Select Artist"
                loadOptions={loadOptions}
                onChange={handleSelectedArtist}
              />
            </Box>
            {/* <Box sx={{ gridColumn: "span 2" }}>
            <Select
              placeholder="Select Artist"
              options={artists}
              onChange={handleSelectedArtist}
              value={artists.filter((obj) =>
                selectedArtist.includes(obj.value)
              )}
              isMulti
            />
          </Box> */}

            <TextField
              fullWidth
              variant="filled"
              type="date"
              name="dateAdded"
              value={inputs.dateAdded || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />

            {/* <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Artist Name"
            name="artistName"
            value={inputs.artistName || ""}
            onChange={handleChange}
            sx={{ gridColumn: "span 2" }}
          /> */}

            <Typography fullWidth sx={{ gridColumn: "span 2" }}>
              Song File
              <TextField
                fullWidth
                type="file"
                name="song"
                onChange={handleFile}
                sx={{ gridColumn: "span 2" }}
              />
            </Typography>

            <Typography fullWidth sx={{ gridColumn: "span 2" }}>
              Song Cover Photo
              <TextField
                fullWidth
                type="file"
                name="coverphoto"
                onChange={handlePic}
                sx={{ gridColumn: "span 2" }}
              />
            </Typography>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Add Song
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddSongs;
