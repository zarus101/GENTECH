import { myAxios } from "./Helper";

//getting all the song
export const getAllMusic = () => {
  return myAxios.get("/songs").then((response) => {
    return response.data;
  });
};

export const getMusicByArtistId = (artistID) => {
  return myAxios.get(`/songs/${artistID}`).then((response) => {
    return response.data;
  });
};

//deleting tyhe song
export const deleteSongById = (songID, token) => {
  return myAxios.delete(`/deleteSong/${songID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllSongs = (token) => {
  return myAxios.delete(`/deleteAllSong`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addSongToLikedList = (token, songID, userID) => {
  return myAxios
    .post("/register", songID, userID, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getLikedSongs = (userID, token) => {
  return myAxios
    .get(`/getAllLiked/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};
