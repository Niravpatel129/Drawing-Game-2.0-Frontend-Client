import React, { useRef, useEffect, useContext } from "react";

import "./Canvas.scss";
import CanvasDraw from "react-canvas-draw";

import Chat from "../Chat/Chat";
import UserList from "../UserList/UserList";
import SocketContext from "../../context";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import TimerClock from "../TimerClock/TimerClock";
import WordBlock from "../WordBlock/WordBlock";

// let socket;

function Canvas() {
  let { socket } = useContext(SocketContext);
  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));
  const { name, room } = useSelector(state => state.contactReducer);
  const history = useHistory();
  const googleUserInfo = localStorageData;

  const canvas = useRef();

  useEffect(() => {
    socket.emit("join", { name, room, googleUserInfo }, err => {
      alert(err || "not sure of the error");
      socket.emit("disconnectUser", googleUserInfo);
      socket.off();
      history.push("/");
    });

    socket.on("updateData", data => {
      if (canvas.current && data) {
        canvas.current.loadSaveData(data, true);
      }
    });
  }, [room, name, socket, localStorageData, history, googleUserInfo]);

  useEffect(() => {
    return () => {
      console.log("will unmount");
      socket.emit("disconnectUser", googleUserInfo);
    };
  }, [socket, googleUserInfo]);

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
          <UserList />
          <TimerClock />
          <WordBlock />
        </div>
      </div>
    </section>
  );
}

export default Canvas;
