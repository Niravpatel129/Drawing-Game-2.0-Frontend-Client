import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chat.scss";
import Message from "../Message/Message";
import { useSelector, useDispatch } from "react-redux";
import SocketContext from "../../context";

function Chat() {
  let { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [msg, addMsg] = useState([]);
  const [input, changeInput] = useState("");
  const [drawWord, setDrawWord] = useState("");
  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));

  const { room } = useSelector(state => state.contactReducer);
  const canDraw = useSelector(state => state.canDrawReducer);

  const messagesRef = useRef();

  useEffect(() => {
    socket.on("sendTime", res => {
      const draw = res.find(i => i.roomId === room);
      setDrawWord(draw.gameData.word);
    });
  }, [room, socket, drawWord]);

  useEffect(() => {
    socket.on("updateMessage", res => {
      addMsg(res);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });

  const submitMessage = e => {
    if (e.charCode === 13) {
      if (input) {
        if (input.toUpperCase() === drawWord.toUpperCase()) {
          socket.emit("guessedCorrect", { user: localStorageData, room });
          dispatch({ type: "SET_NOTIFICATION", payload: true });
          dispatch({ type: "SET_MESSAGE", payload: `You gussed the word! ` });

          socket.emit("chatMessage", {
            name: localStorageData,
            room,
            input: ":star::star::star:CORRECT:star::star::star:"
          });
        } else {
          socket.emit("chatMessage", { name: localStorageData, room, input });
        }
      }
      changeInput("");
    }
  };

  const renderMessage = () => {
    if (msg)
      return msg.map((e, index) => {
        return (
          <Message
            src={e.name.imageUrl}
            name={e.name.name}
            message={e.message}
            key={index}
          />
        );
      });
  };

  const Chat = () => {
    let placeholder = " ✏️";
    if (canDraw) {
      placeholder = "You are drawing!";
    }
    return (
      <div className="Chat">
        <div className="title">
          <h1>ChatBox</h1>
        </div>
        <div className="messages" ref={messagesRef}>
          {renderMessage()}
        </div>
        <input
          value={input}
          onChange={e => changeInput(e.target.value)}
          onKeyPress={submitMessage}
          placeholder={placeholder}
          disabled={canDraw}
        ></input>
      </div>
    );
  };

  return <React.Fragment>{Chat()}</React.Fragment>;
}

export default Chat;
