import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { deleteUserById, getAllUsers, getCurrentUserDetail } from "../../../../connection/UserService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser]= useState('');
  const [token, setToken]= useState('');

  useEffect(() => {

    setUser(getCurrentUserDetail().user)
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
    //going to delete post

    deleteUserById(value.id, token)
      .then((res) => {
        console.log(res);

        toast.success("user deleted!!");
      })
      .catch((error) => {
        toast.error("failed to delete the user..");
      });
  }
  return (
    <>
      <main>
        <table>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
            <th> Password</th>
            <th> Role</th>
            <th>Options</th>
          </tr>
          {users.map((value, index) => (
            <tr key={index}>
              <td>{value.id}</td>
              <td>{value.name}</td>
              <td>{value.email}</td>
              <td>{value.passsword}</td>
              <td>{value.role}</td>

              <td>
                <button onClick={() => deleteUser(value)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </main>
    </>
  );
};

export default UserList;
