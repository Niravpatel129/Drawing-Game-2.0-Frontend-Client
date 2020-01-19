import React, { useRef, useEffect } from "react";

import { useSelector } from "react-redux";

import "./Canvas.scss";
import CanvasDraw from "react-canvas-draw";

import io from "socket.io-client";
import Chat from "../Chat/Chat";

let socket;

function Canvas() {
  const userInfo = useSelector(state => state.contactReducer);
  const { name, room } = userInfo;
  console.log(name, room);
  const canvas = useRef();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      socket = io.connect("https://drawing-game-server-2.herokuapp.com");
    } else {
      socket = io.connect("localhost:5000");
    }
    socket.emit("joinRoom", room);
    socket.on("updateData", data => {
      if (canvas.current && data) {
        canvas.current.loadSaveData(data, true);
      }
    });
  }, [room]);

  return (
    <section className="Canvas">
      <div className="Container">
        <Chat />
        <div
          className="CanvasContainer"
          onMouseUp={() => {
            socket.emit("drawingData", {
              data: canvas.current.getSaveData(),
              room
            });
          }}
        >
          <CanvasDraw
            ref={canvas}
            canvasWidth={"65vw"}
            canvasHeight={"90vh"}
            disabled={false}
            lazyRadius={0}
            hideInterface={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Canvas;
