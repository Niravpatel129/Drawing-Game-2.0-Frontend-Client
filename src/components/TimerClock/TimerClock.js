import React, { useContext, useEffect, useState } from "react";
import "./TimerClock.scss";
import SocketContext from "../../context";
import { useSelector } from "react-redux";

function TimerClock() {
  let { socket } = useContext(SocketContext);
  const { room } = useSelector(state => state.contactReducer);
  const [time, setTime] = useState(0);

  useEffect(() => {
    socket.on("sendTime", res => {
      const time = res.find(i => i.roomId === room);
      setTime(time.gameData.timer);
    });
  }, [socket, room]);
  return (
    <div className="TimerClock-container">
      Time Left:
      <div className="TimerClock">{time}</div>
    </div>
  );
}

export default TimerClock;
