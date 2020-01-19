import React from "react";

import SocketContext from "../context";
import io from "socket.io-client";

let socket;

const SocketProvider = props => {
  if (process.env.NODE_ENV === "production") {
    socket = io.connect("https://drawing-game-server-2.herokuapp.com");
  } else {
    socket = io.connect("localhost:5000");
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
