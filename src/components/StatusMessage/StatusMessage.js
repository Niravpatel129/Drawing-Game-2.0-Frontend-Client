import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "../../context";
import "./StatusMessage.scss";

function StatusMessage() {
  let { socket } = useContext(SocketContext);
  const [gameStarted, setGameStarted] = useState(false);
  const [status, setStatus] = useState("");
  const drawer = useSelector(state => state.canDrawReducer);
  const dispatch = useDispatch();

  // sockets
  socket.on("gameStart", () => {
    setStatus("Game In Progress");
    setGameStarted(true);
    dispatch({ type: "SET_STATUS", payload: true });
  });

  socket.on("gameEnded", () => {
    setStatus("Game Not Started");
    dispatch({ type: "SET_DRAW", payload: false });
    console.log("game ended");
    dispatch({ type: "SET_STATUS", payload: false });

    setGameStarted(false);
  });

  useEffect(() => {
    if (!gameStarted) {
      setStatus("Game Not Started");
    } else {
      setStatus("Game In Progress");
    }
  }, [drawer, gameStarted]);

  return <div className="StatusMessage">{status}</div>;
}

export default StatusMessage;
