import React, { useRef, useEffect, useContext } from "react";

import "./Canvas.scss";
import CanvasDraw from "react-canvas-draw";

import Chat from "../Chat/Chat";
import SocketContext from "../../context";
import { useSelector } from "react-redux";

// let socket;

function Canvas() {
  let { socket } = useContext(SocketContext);
  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));
  const { name, room } = useSelector(state => state.contactReducer);

  const canvas = useRef();

  useEffect(() => {
    let googleUserInfo = localStorageData;

    socket.emit("join", { name, room, googleUserInfo }, () => {
      socket.emit("disconnect");
      alert("Error");
      socket.off();
    });

    socket.on("updateData", data => {
      if (canvas.current && data) {
        canvas.current.loadSaveData(data, true);
      }
    });
  }, [room, name, socket, localStorageData]);

  useEffect(() => {
    return () => {
      socket.emit("disconnect");
      console.log("will unmount");
    };
  }, []);

  return (
    <section className="Canvas">
      <div className="Container">
        <Chat socket={socket} />
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
            disabled={false}
            brushRadius={6}
            canvasWidth={900}
            canvasHeight={600}
            lazyRadius={0}
            hideInterface={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Canvas;
