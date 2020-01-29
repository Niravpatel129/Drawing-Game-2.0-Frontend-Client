import React, { useContext, useEffect, useState } from "react";
import "./TimerClock.scss";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function TimerClock() {
  let { socket } = useContext(SocketContext);
  const { room } = useSelector(state => state.contactReducer);
  const gameStatus = useSelector(state => state.gameInProgressReducer);
  const [time, setTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("sendTime", res => {
      const time = res.find(i => i.roomId === room);
      if (time) {
        setTime(time?.gamedata.timer);
        dispatch({ type: "SET_TIME", payload: time?.gamedata.timer });
      }
    });
  }, [socket, room, dispatch, gameStatus]);
  return (
    <div className="TimerClock-container">
      {time !== 65 && (
        <div className="TimerClock">
          <CircularProgressbar
            strokeWidth={13}
            maxValue={65}
            minValue={0}
            value={time}
            text={`${time}`}
            styles={buildStyles({
              pathColor: "black",
              textColor: "black",
              textSize: "31px",
              trailColor: "transparent"
            })}
          />
        </div>
      )}
    </div>
  );
}

export default TimerClock;
