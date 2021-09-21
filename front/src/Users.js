import React, { useEffect, useState } from "react";
import "./Users.css";

function Users({ socket }) {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const userListener = (user) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        newUsers[user.id] = user;
        console.log(newUsers);
        return newUsers;
      });
    };

    const deleteUserListener = (userID) => {
      setUsers((prevUsers) => {
        const newUsers = { ...prevUsers };
        delete newUsers[userID];
        return newUsers;
      });
    };

    socket.on("user", userListener);
    socket.on("deleteUser", deleteUserListener);
    socket.emit("getUsers");

    return () => {
      socket.off("user", userListener);
      socket.off("deleteUser", deleteUserListener);
    };
  }, [socket]);

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
