import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { myAxios } from "./Helper"

////checking user is logged in or not
export const isLoggedIN = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};

//user register

export const signUP = (user) => {
  return myAxios.post("/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios.post("/login", loginDetail).then((response) => response.data);
};

export const doLogin=(data,dispatch, next)=>{
    localStorage.setItem("data", JSON.stringify(data))
    dispatch({
        type:actionType.SET_USER,
        user:data,
      })
    next()
 }

///getting current logged In user

export const getCurrentUserDetail = () => {
  if (isLoggedIN) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return false;
  }
};

//logging out the user
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//getting all the users
export const getAllUsers = () => {
  return myAxios.get("/allusers").then((response) => {
    return response.data;
  });
};

//change Password
export const userChangePassword = (data, token) => {
  return myAxios.post("/changePassword", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//user changing details
export const updateUserDetails = (data, token) => {
  return myAxios.post("/changeUserDetails", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//deleting tyhe user
export const deleteUserById = (id, token) => {
  return myAxios.delete(`/deleteUser/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfilePhoto = (userData, token) => {
  return myAxios.post("/changeUserProfile", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
