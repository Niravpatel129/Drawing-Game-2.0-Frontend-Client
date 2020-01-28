import React, { useContext, useEffect, useState } from "react";
import "./UserList.scss";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";
import ProfileCard from "../ProfileCard/ProfileCard";
import FlipMove from "react-flip-move";

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
      if (res !== users) updateUsers(res);
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
  }, [socket, room, users]);

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
          <ProfileCard
            index={index}
            key={index}
            points={i.points}
            src={i.user.googleUserInfo.imageUrl}
            name={i.user.googleUserInfo.name}
            drawing={drawing}
          />
        );
      });
    }
  };
  const settings = () => {
    console.log("clicked settings");
  };

  return (
    <div className="UserList">
      <h2>Ranking</h2>
      <div className="usersparent" id="parent">
        <div className="users" id="child" style={{ position: "relative" }}>
          <FlipMove duration={500} easing="ease-in-out">
            {renderUser()}
          </FlipMove>
        </div>
      </div>
      <img
        onClick={settings}
        alt="settings"
        src="https://i.imgur.com/op3hLAL.png"
      ></img>
    </div>
  );
}

export default UserList;
