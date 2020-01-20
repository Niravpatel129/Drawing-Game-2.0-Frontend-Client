import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import SocketContext from "../../context";

function UserList() {
  let { socket } = useContext(SocketContext);
  let [users, updateUsers] = useState([]);

  useEffect(() => {
    socket.on("getAllUsers", res => {
      console.log("getAllUsers");
      updateUsers(res);
    });
  }, [socket]);

  const renderUser = () => {
    return users.map((i, index) => {
      return (
        <div className="user-card" key={index}>
          <h3>{i.user.googleUserInfo.name}</h3>
          <p>{i.points} Points</p>
        </div>
      );
    });
  };

  return (
    <div className="UserList">
      <h4>Players</h4>
      {renderUser()}
    </div>
  );
}

export default UserList;
