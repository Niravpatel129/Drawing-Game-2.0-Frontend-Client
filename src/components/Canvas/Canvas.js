import React, { useContext, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import SocketContext from "../../context";
import RoomNumber from "../RoomNumber/RoomNumber";
import TimerClock from "../TimerClock/TimerClock";
import ToolBar from "../ToolBar/ToolBar";
import UserList from "../UserList/UserList";
import WordBlock from "../WordBlock/WordBlock";
import "./Canvas.scss";
import StatusMessage from "../StatusMessage/StatusMessage";
import UpdatedChat from "../UpdatedChat/UpdatedChat";

// let socket;

function Canvas() {
  let { socket } = useContext(SocketContext);
  const { name, room } = useSelector(state => state.contactReducer);
  const canDraw = useSelector(state => state.canDrawReducer);
  const brushColor = useSelector(state => state.ColorReducer);
  const brushWidth = useSelector(state => state.brushWidthReducer);

  const history = useHistory();
  const canvas = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (canvas.current) {
        canvas.current.clear();
      }
    }, 600);
  }, [canDraw]);

  useEffect(() => {
    socket.on("roundEnded", () => {
      dispatch({ type: "SET_GUESS", payload: false });
      dispatch({ type: "SET_DRAW", payload: false });

      if (canvas.current) {
        canvas.current.clear();
      }
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
  }, [socket, history, room, dispatch]);

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
        <UserList />

        <div className="CanvasContainer" onMouseUp={handleMouseDown}>
          <CanvasDraw
            style={{ background: "none" }}
            ref={canvas}
            disabled={!canDraw}
            brushRadius={brushWidth}
            brushColor={brushColor}
            canvasWidth={800}
            canvasHeight={600}
            lazyRadius={0}
            hideInterface={true}
            hideGrid={true}
          />

          <ToolBar canvasRef={canvas} handleMouseDown={handleMouseDown} />
          <TimerClock />
          <WordBlock />
          <RoomNumber />
          <StatusMessage />
        </div>
        <UpdatedChat />
      </div>
    </section>
  );
}

export default Canvas;
