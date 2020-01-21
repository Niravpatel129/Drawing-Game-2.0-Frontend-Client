import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import SocketContext from "../../context";
import { useSelector } from "react-redux";

function UserList() {
  const [roomData, setRoomData] = useState();
  let { socket } = useContext(SocketContext);
  let [users, updateUsers] = useState([]);
  let [drawerId, updateDrawer] = useState();
  const { room } = useSelector(state => state.contactReducer);

  useEffect(() => {
    socket.on("checkUserListAgain", () => {
      socket.emit("getUserList", room);
    });

    socket.on("getAllUsers", res => {
      updateUsers(res);
    });

    socket.on("sendTime", res => {
      const draw = res.find(i => i.roomId === room);
      setRoomData(draw);
      if (draw && draw.gameData.drawer.user)
        updateDrawer(draw.gameData.drawer.user.googleUserInfo.googleId);
    });
  }, [socket, room]);

  const renderUser = () => {
    if (users) {
      return users.map((i, index) => {
        if (
          i.user.googleUserInfo.googleId === drawerId &&
          roomData.gameData.gameStarted
        ) {
          return (
            <div className="user-card" key={index}>
              <h3>
                {i.user.googleUserInfo.name}
                <span role="img" aria-label="pencil">
                  {" "}
                  ✏️
                </span>
              </h3>
              <p>{i.points} Points</p>
            </div>
          );
        } else {
          return (
            <div className="user-card" key={index}>
              <h3>{i.user.googleUserInfo.name}</h3>
              <p>{i.points} Points</p>
            </div>
          );
        }
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
