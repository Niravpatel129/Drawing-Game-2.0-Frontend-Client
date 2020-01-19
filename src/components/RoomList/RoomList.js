import React, { useEffect, useContext, useState } from "react";
import "./RoomList.scss";
import SocketContext from "../../context";

function RoomList() {
  let { socket } = useContext(SocketContext);
  let [rooms, updateRoomList] = useState([]);
  let [title, changeTitle] = useState("No Rooms");
  useEffect(() => {
    socket.emit("getAllRooms");
  }, [socket]);

  useEffect(() => {
    socket.on("sendAllRooms", res => {
      if (res.length > 0) {
        changeTitle("Rooms");
      }
      updateRoomList(res);
    });
  }, [socket, rooms]);

  const renderRooms = () => {
    if (rooms.length > 0) {
      return rooms.map((i, index) => {
        console.log(i);
        return (
          <div className="list-item" key={index}>
            <h3>Room {i.roomId || "Room Name"}</h3>
            <h4>{i.users.length}/4</h4>
            <button>Join</button>
          </div>
        );
      });
    }
  };

  return (
    <div className="RoomList">
      <div className="Container">
        <h1>{title}</h1>
        {renderRooms()}
      </div>
    </div>
  );
}

export default RoomList;
