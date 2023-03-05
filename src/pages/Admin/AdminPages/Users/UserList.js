import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import "../../../../assets/UserList.scss";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { styled } from "@mui/material/styles";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import {
  deleteUserById,
  getAllUsers,
  getCurrentUserDetail,
} from "../../../../connection/UserService";
import Header from "../../AdminComponents/Header";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
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
        <main>
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
          <Grid item xs={20}>
            <Grid container justifyContent="center" spacing={2}>
              {users
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => (
                  <Grid key={value} item>
                    <Paper
                      sx={{
                        p: 2,
                        margin: "auto",
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img
                              alt="complex"
                              src={`/public/img/user/${value.userProfilePhoto}`}
                            />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                              >
                                <b>Name:</b> <span>{value.name}</span>
                              </Typography>

                              <Typography variant="body2" gutterBottom>
                                Email : <span>{value.email}</span>
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                role : <span>{value.role}</span>
                              </Typography>

                              <Grid item className="card_buttons" spacing={1}>
                                <Button
                                  className="delete_button"
                                  onClick={() => deleteUser(value)}
                                >
                                  <Delete />
                                </Button>
                                <Button
                                  className="edit_button"
                                  onClick={() => handleUpdate(value)}
                                >
                                  <Edit />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            className="premium_icon"
                          >
                            {value.account_type === "premium" ? (
                              <WorkspacePremiumIcon />
                            ) : (
                              <div></div>
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </main>
      </Box>
    </>
  );
};

export default UserList;
