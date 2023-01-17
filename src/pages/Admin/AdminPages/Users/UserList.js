import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUsers } from "../../../../connection/UserService";

const UserList = () => {
  const [users, setUsers]= useState([])

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });



  }, []);
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
                <button >
                  Delete
                </button>
                <button >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </table>
      </main>
    </>
  );
};

export default UserList;
