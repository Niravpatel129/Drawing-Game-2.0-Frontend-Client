import React, { useRef, useEffect } from "react";

import { useSelector } from "react-redux";

import "./Canvas.scss";
import { isMobile } from "react-device-detect";
import CanvasDraw from "react-canvas-draw";

import io from "socket.io-client";

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

  const undo = () => {
    if (canvas) canvas.current.undo();
  };

  return (
    <section className="Canvas">
      {!isMobile ? (
        <div
          onMouseUp={() => {
            socket.emit("drawingData", {
              data: canvas.current.getSaveData(),
              room
            });
          }}
        >
          <CanvasDraw
            ref={canvas}
            canvasWidth={1200}
            canvasHeight={550}
            disabled={false}
            lazyRadius={0}
            hideInterface={false}
          />
          <button onClick={undo}>Undo</button>
        </div>
      ) : (
        <h1>Mobile not supported</h1>
      )}
    </section>
  );
}

export default Canvas;
