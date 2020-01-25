import React, { useState, useContext } from "react";
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
    console.log("game started");
    setStatus("Game In Progress");
    setGameStarted(true);
  });

  socket.on("gameEnded", () => {
    console.log("game ended");
    setStatus("Game Not Started");
    dispatch({ type: "SET_DRAW", payload: false });
    setGameStarted(false);
  });

  return <div className="StatusMessage">{status}</div>;
}

export default StatusMessage;
