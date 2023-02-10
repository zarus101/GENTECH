import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import React from "react";
import "../../../../assets/UserList.scss";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { red } from "@mui/material/colors";

import {
  deleteUserById,
  getAllUsers,
  getCurrentUserDetail,
} from "../../../../connection/UserService";
import Header from "../../AdminComponents/Header";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUserDetail().user);
    setToken(getCurrentUserDetail().token);
    getAllUsers()
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function deleteUser(value) {
    deleteUserById(value.id, token)
      .then((res) => {
        console.log(value.id);
        toast.success("user deleted!!");
        getAllUsers();
      })
      .catch((error) => {
        toast.error("failed to delete the user..");
      });
  }

  const handleUpdate = (value) => {
    navigate(`/updateuser/${value.id}`);
  };
  return (
    <>
      <Box m="20px" className="userlist-section">
        <Box
          className="header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="left-part">
            <Header title="User List" subtitle="Total users" />
          </div>
          <div className="search-div">
            <form action="" className="search-bar">
              <input
                type="search"
                placeholder="search user here"
                name="seacrh"
                onChange={(event) => {
                  setSearchItem(event.target.value);
                }}
              />
            </form>
          </div>
        </Box>
        <main>
          <table>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>User Profile</th>
              <th> Role</th>
              <th>Options</th>
            </tr>
            {users
              .filter((value) => {
                if (searchItem === "") {
                  return value;
                } else if (
                  value.name
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((value) => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>
                      <img
                        src={`/public/img/user/${value.userProfilePhoto}`}
                        alt="user"
                        width="100px"
                        loading="lazy"
                      />
                    </td>

                    <td>{value.role}</td>

                    <td>
                      <button
                        onClick={() => deleteUser(value)}
                        style={{ cursor: "pointer" }}
                      >
                        <Delete sx={{ color: red[800] }} />
                      </button>
                      <button
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                        onClick={() => handleUpdate(value)}
                      >
                        <Edit color="primary" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </main>
      </Box>
    </>
  );
};

export default UserList;
