import React, { useRef, useEffect, useContext } from "react";

import "./Canvas.scss";
import CanvasDraw from "react-canvas-draw";

import Chat from "../Chat/Chat";
import UserList from "../UserList/UserList";
import SocketContext from "../../context";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import TimerClock from "../TimerClock/TimerClock";
import WordBlock from "../WordBlock/WordBlock";
import RoomNumber from "../RoomNumber/RoomNumber";
import ToolBar from "../ToolBar/ToolBar";

// let socket;

function Canvas() {
  let { socket } = useContext(SocketContext);
  const { name, room } = useSelector(state => state.contactReducer);
  const canDraw = useSelector(state => state.canDrawReducer);
  const brushColor = useSelector(state => state.ColorReducer);

  const history = useHistory();
  const canvas = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("roundEnded", () => {
      canvas.current.clear();
    });

    let googleUserInfo = JSON.parse(localStorage.getItem("loginUserInfo"));

    if (!googleUserInfo) {
      socket.off();
      history.push("/login");
      alert("Login first please!");
    } else {
      socket.emit(
        "join",
        { name: googleUserInfo.name, room, googleUserInfo },
        err => {
          alert(err || "not sure of the error");
          socket.emit("disconnectUser", googleUserInfo);
          socket.off();
          history.push("/");
        }
      );
    }
  }, [socket, history, room]);

  useEffect(() => {
    socket.on("updateData", data => {
      if (canvas.current && data) {
        canvas.current.loadSaveData(data, true);
      }
    });

    socket.on("newJoinNotification", name => {
      dispatch({ type: "SET_NOTIFICATION", payload: true });
      dispatch({ type: "SET_MESSAGE", payload: `${name} has joined the room` });
    });
  }, [room, name, socket, history, dispatch]);

  useEffect(() => {
    return () => {
      console.log("will unmount");
      socket.emit(
        "disconnectUser",
        JSON.parse(localStorage.getItem("loginUserInfo"))
      );
    };
  }, [socket]);

  const handleMouseDown = () => {
    socket.emit("drawingData", {
      data: canvas.current.getSaveData(),
      room
    });
  };

  return (
    <section className="Canvas">
      <div className="Container">
        <Chat socket={socket} />
        <div className="CanvasContainer" onMouseUp={handleMouseDown}>
          <CanvasDraw
            ref={canvas}
            disabled={!canDraw}
            brushRadius={6}
            brushColor={brushColor}
            canvasWidth={900}
            canvasHeight={600}
            lazyRadius={0}
            hideInterface={true}
          />
          <ToolBar canvasRef={canvas} handleMouseDown={handleMouseDown} />
          <UserList />
          <TimerClock />
          <WordBlock />
          <RoomNumber />
        </div>
      </div>
    </section>
  );
}

export default Canvas;
