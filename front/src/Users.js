import React, { useEffect, useState } from "react";
import "./Users.css";

function Users({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersListener = (users) => setUsers(users);
    const newUserListener = user => setUsers(prevUsers => {
      return [...prevUsers, user]
    })

    const deleteUserListener = (userID) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        delete newUsers[userID];
        return newUsers;
      });
    };

    const updateUsername = (user) => {
      setUsers(prevUsers => {
        prevUsers[user.id] = user
        return prevUsers;
      })
    }

    socket.on("users", usersListener);
    socket.on("userConnection", newUserListener);
    socket.on("updateUsername", updateUsername);
    socket.on("deleteUser", deleteUserListener);
    socket.emit("getUsers");

    return () => {
      socket.off("users", usersListener);
      socket.off("userConnection", newUserListener);
      socket.off("updateUsername", updateUsername);
      socket.off("deleteUser", deleteUserListener);
    };
  }, [socket, users]);

  return (
    <div className="user-list">
      {[...Object.values(users)]
        .sort((a, b) => a.name - b.name)
        .map((user) => (
          <span key={user.id} className="user">
            {user.name}:
          </span>
        ))}
    </div>
  );
}

export default Users;
