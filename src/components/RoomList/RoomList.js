import React, { useEffect, useContext, useState } from "react";
import "./RoomList.scss";
import SocketContext from "../../context";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

function RoomList() {
  const history = useHistory();
  const dispatch = useDispatch();

  let { socket } = useContext(SocketContext);

  let [rooms, updateRoomList] = useState([]);

  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));

  let [title, changeTitle] = useState("No Active Rooms Found");
  useEffect(() => {
    socket.emit("getAllRooms");
  }, [socket]);

  useEffect(() => {
    socket.on("sendAllRooms", res => {
      console.log(res);
      if (res.length > 0) {
        changeTitle("Rooms");
      }
      updateRoomList(res);
    });
  }, [socket, rooms]);

  const redirect = room => {
    if (localStorageData) {
      dispatch({
        type: "SET_INFO",
        payload: { name: localStorageData.name, room }
      });
      history.push("/canvas");
    } else {
      history.push("/login");
    }
  };

  const newRoom = () => {
    if (localStorageData) {
      dispatch({
        type: "SET_INFO",
        payload: {
          name: localStorageData.name,
          room: Math.floor(Math.random() * 500)
        }
      });
      history.push("/canvas");
    } else {
      history.push("/login");
    }
  };

  const renderRooms = () => {
    if (rooms.length > 0) {
      return rooms.map((i, index) => {
        return (
          <div className="list-item" key={index}>
            <h3>Room {i.roomId || "Room Name"}</h3>
            <h4>{i.users.length}/4</h4>
            <button onClick={e => redirect(i.roomId)}>
              {i.users.length > 4 ? "FULL" : "Join"}
            </button>
          </div>
        );
      });
    }
  };

  const changeNick = () => {
    let currentInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
    if (!currentInfo) {
      Swal.fire("wait!", "Login first before setting name!", "warning");
      history.push("/login");
    } else {
      Swal.fire({
        title: "New Nickname",
        input: "text"
      }).then(res => {
        if (res.value) {
          currentInfo.name = res.value;
          localStorage.setItem("loginUserInfo", JSON.stringify(currentInfo));
        }
      });
    }
  };

  return (
    <div className="RoomList">
      <div className="Container">
        <div className="child">
          <h1>{title}</h1>
          {renderRooms()}
        </div>
      </div>
      <div onClick={newRoom} className="myButton">
        New Room
      </div>
      <div onClick={changeNick} className="myButton2">
        ChangeNick
      </div>
    </div>
  );
}

export default RoomList;
