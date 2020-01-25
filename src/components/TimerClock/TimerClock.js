import React, { useContext, useEffect, useState } from "react";
import "./TimerClock.scss";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";

function TimerClock() {
  let { socket } = useContext(SocketContext);
  const { room } = useSelector(state => state.contactReducer);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("sendTime", res => {
      const time = res.find(i => i.roomId === room);
      if (time) {
        setTime(time.gameData.timer);
        dispatch({ type: "SET_TIME", payload: time.gameData.timer });
      }
    });
  }, [socket, room, dispatch]);
  return (
    <div className="TimerClock-container">
      Time Left:
      <div className="TimerClock">{time}</div>
    </div>
  );
}

export default TimerClock;
