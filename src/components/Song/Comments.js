import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "../../assets/comments.scss";
import {
  deleteComment,
  getAllComments,
  postComment,
} from "../../connection/MusicService";
import {
  getAllUsers,
  getCurrentUserDetail,
  isLoggedIN,
} from "../../connection/UserService";
import DeleteIcon from "@mui/icons-material/Delete";

const Comments = ({ selectedSong }) => {
  const [userID, setUserID] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllComments(selectedSong?.songID)
      .then((results) => {
        setData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedSong?.songID]);

  useEffect(() => {
    getAllUsers()
      .then((results) => {
        setUsers(results);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const [newComment, setNewComment] = useState("");

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    if (isLoggedIN()) {
      const currentUser = getCurrentUserDetail();
      console.log(getCurrentUserDetail());
      setUserID(currentUser.user.id);
      setToken(getCurrentUserDetail()?.token);
      console.log(commentsWithUsers);
    }

    // fetch comments for the current song from the API
  }, []);

  const handlePostComment = (event) => {
    event.preventDefault();

    // Check if user is logged in
    if (!userID || !token) {
      toast.error("You must be logged in to comment");
      return;
    }

    const commentData = {
      comment: newComment,
      userID: userID,
      songID: selectedSong?.songID,
    };

    console.log(commentData);

    postComment(commentData, token)
      .then((response) => {
        // update the UI to display the new comment
        console.log(data);
        console.log(response);
        setData([...data, response.data]);

        setNewComment("");
        toast.success("Comment added successfully");
      })
      .catch((error) => {
        toast.error("error");
        console.log(error);
        // TODO: handle the error
      });
  };

  const commentsWithUsers = data.map((comment) => {
    const user = users.find((user) => user.id === comment.userID);
    return {
      comment: comment,
      user: user,
    };
  });

  const handleDelete = (commentID) => {
    const deleteData = {
      userID: userID,
      songID: selectedSong?.songID,
      commentID: commentID,
    };
    deleteComment(deleteData, token)
      .then((response) => {
        getAllComments(selectedSong?.songID)
          .then((results) => {
            setData(results);
            console.log(results);
          })
          .catch((error) => {
            console.error(error);
          });
        toast.success("Comment deleted successfully");
      })
      .catch((error) => {
        toast.error("Error deleting comment");
        console.log(error);
      });
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      <ul>
        {commentsWithUsers.length === 0 ? (
          <li>
            <span>No comments</span>
          </li>
        ) : (
          commentsWithUsers.map((commentWithUser, index) => (
            <>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 500,
                  maxHeight: 300,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Photo"
                      src={`/public/img/user/${commentWithUser.user?.profilephoto}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={commentWithUser.user?.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {commentWithUser.comment.comment}
                        </Typography>

                    
                        {!isLoggedIN() && getCurrentUserDetail().user.id ===
                        commentWithUser.user?.id ? (
                          <Button
                            onClick={() =>
                              handleDelete(commentWithUser.comment.commentID)
                            }
                          >
                            <DeleteIcon />
                          </Button>
                        ) : (
                          <div></div>
                        )}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>

          
            </>
          ))
        )}
      </ul>
      <h3>Add a comment</h3>
      <form onSubmit={handlePostComment}>
        <label htmlFor="newComment">New Comment:</label>
        <br />
        <textarea
          id="newComment"
          value={newComment}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Comments;
