export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_SONG: "SET_SONG",
  SET_SONG_PLAYING: "SET_SONG_PLAYING",
  SET_MINI_PLAYER: "SET_MINI_PLAYER",
  SET_PLAYING: "SET_PLAYING",
  SET_SLIDE_UP: "SET_SLIDE_UP",
  SET_LOGGED_IN: "SET_LOGGED_IN",
  SET_CURRENT_SONG: "SET_CURRENT_SONG",
  SET_LIKED_SONGS: "SET_LIKED_SONGS",
  SET_BACKGROUND: "SET_BACKGROUND",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };

    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };

    case actionType.SET_SONG:
      return {
        ...state,
        song: action.song,
      };

    case actionType.SET_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };

    case actionType.SET_MINI_PLAYER:
      return {
        ...state,
        miniPlayer: action.miniPlayer,
      };

    case actionType.SET_PLAYING:
      return {
        ...state,
        Playing: action.Playing,
      };
    case actionType.SET_SLIDE_UP:
      return {
        ...state,
        slideUp: action.slideUp,
      };

    case actionType.SET_LOGGED_IN:
      return {
        ...state,
        loggedIN: action.loggedIN,
      };

    case actionType.SET_CURRENT_SONG:
      return {
        ...state,
        currentlyPlayingSong: action.currentlyPlayingSong,
      };

    case actionType.SET_LIKED_SONGS:
      return {
        ...state,
        likedSongs: action.likedSongs,
      };

    case actionType.SET_BACKGROUND:
      return {
        ...state,
        background: action.background,
      };

    default:
      return state;
  }
};

export default reducer;
