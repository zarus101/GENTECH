import { myAxios } from "./Helper";

//getting all the song
export const getAllMusic = () => {
  return myAxios.get("/songs").then((response) => {
    return response.data;
  });
};

export const getMusicByArtistId = (artistID) => {
  return myAxios.get(`/getSongsByArtistID/${artistID}`).then((response) => {
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

export const postComment = (commentData, token) => {
  return myAxios.post("/songs/postcomment", commentData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllComments = (songID) => {
  return myAxios.get(`getAllComments/${songID}`).then((response) => {
    return response.data;
  });
};
export const deleteComment = (data) => {
  return myAxios.put(`/deletecomment/${data.commentID}`, data);
};

export const getLikedData = (userid) => {
  return myAxios.get(`/getAllLiked/${userid}`).then((response) => {
    return response.data;
  });
};
