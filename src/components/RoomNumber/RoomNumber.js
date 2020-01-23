import React from "react";
import "./RoomNumber.scss";
import { useSelector } from "react-redux";
function RoomNumber() {
  const { room } = useSelector(state => state.contactReducer);
  const renderRoom = room < 10 ? "0" + room : room;
  return <div className="RoomNumber">{`Room# ${renderRoom}`}</div>;
}

export default RoomNumber;
