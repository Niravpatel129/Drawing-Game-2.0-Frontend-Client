import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import SocketContext from "../../context";
import { useSelector } from "react-redux";

function UserList() {
  let { socket } = useContext(SocketContext);
  let [users, updateUsers] = useState([]);
  const { room } = useSelector(state => state.contactReducer);

  useEffect(() => {
    socket.on("checkUserListAgain", () => {
      socket.emit("getUserList", room);
    });

    socket.on("getAllUsers", res => {
      updateUsers(res);
    });
  }, [socket, room]);

  const renderUser = () => {
    if (users) {
      console.log(users);
      return users.map((i, index) => {
        return (
          <div className="user-card" key={index}>
            <h3>{i.user.googleUserInfo.name}</h3>
            <p>{i.points} Points</p>
          </div>
        );
      });
    }
  };

  return (
    <div className="UserList">
      <h4>Players</h4>
      {renderUser()}
    </div>
  );
}

export default UserList;
