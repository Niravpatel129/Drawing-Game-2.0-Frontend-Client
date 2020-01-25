import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";

function UserList() {
  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));
  const [roomData, setRoomData] = useState();
  let { socket } = useContext(SocketContext);
  let [users, updateUsers] = useState([]);
  let [drawerId, updateDrawer] = useState();
  let [drawerName, updateDrawerName] = useState("");
  const { room } = useSelector(state => state.contactReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomData && roomData.gameData.drawer) {
      if (roomData.gameData.drawer.user) {
        if (
          localStorageData.googleId ===
          roomData.gameData.drawer.user.googleUserInfo.googleId
        ) {
          dispatch({ type: "SET_DRAW", payload: true });
        } else {
          dispatch({ type: "SET_DRAW", payload: false });
        }
      }
    }
    if (roomData) {
      if (users.length >= 2 && !roomData.gameData.gameStarted) {
        socket.emit("gameStart", room);
      }
    }

    socket.on("gameStart", room => {
      if (room) {
        dispatch({ type: "SET_NOTIFICATION", payload: true });
        dispatch({
          type: "SET_MESSAGE",
          payload: `Room ${room} has started the game 🎮`
        });
      }
    });
  }, [users, roomData, socket, room, dispatch, localStorageData]);

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
      if (draw.gameData.drawer) {
        if (draw && draw.gameData.drawer.user) {
          updateDrawerName(draw.gameData.drawer.user.googleUserInfo.name);
          updateDrawer(draw.gameData.drawer.user.googleUserInfo.googleId);
        }
      }
    });
  }, [socket, room]);

  useEffect(() => {
    if (drawerName) {
      dispatch({ type: "SET_NOTIFICATION", payload: true });
      dispatch({
        type: "SET_MESSAGE",
        payload: `${drawerName} is now Drawing 🎨🎨`
      });
    }
  }, [drawerId, dispatch, drawerName]);

  const renderUser = () => {
    if (users) {
      const sortedUsers = users.sort((a, b) => {
        return b.points - a.points;
      });

      return sortedUsers.map((i, index) => {
        const drawing =
          i.user.googleUserInfo.googleId === drawerId &&
          roomData.gameData.gameStarted;
        return (
          <div className="user-card" key={index}>
            <h3>
              {i.user.googleUserInfo.name}
              {drawing && (
                <span role="img" aria-label="pencil">
                  {" "}
                  ✏️
                </span>
              )}
            </h3>
            <p>{i.points} Points</p>
          </div>
        );
      });
    }
  };

  return (
    <div className="UserList">
      <h4>Room Users:</h4>
      {renderUser()}
    </div>
  );
}

export default UserList;
