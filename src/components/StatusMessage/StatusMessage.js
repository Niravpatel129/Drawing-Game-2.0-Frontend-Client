import React, { useState, useContext, useEffect } from "react";
import "./StatusMessage.scss";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";

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
  });

  socket.on("gameEnded", () => {
    setStatus("Game Not Started");
    dispatch({ type: "SET_DRAW", payload: false });
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
