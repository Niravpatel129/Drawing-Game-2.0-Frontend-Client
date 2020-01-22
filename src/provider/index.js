import React, { useEffect } from "react";

import SocketContext from "../context";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

let socket;

const SocketProvider = props => {
  const dispatch = useDispatch();
  if (process.env.NODE_ENV === "production") {
    socket = io.connect("https://drawing-game-server-2.herokuapp.com");
  } else {
    socket = io.connect("localhost:5000");
  }

  useEffect(() => {
    socket.on("connected", () => {
      dispatch({ type: "TOGGLE_LOADING_SPINNER", payload: false });
    });
  }, [dispatch]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
