import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chat.scss";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import SocketContext from "../../context";

function Chat() {
  let { socket } = useContext(SocketContext);

  const [msg, addMsg] = useState([]);
  const [input, changeInput] = useState("");

  const localStorageData = JSON.parse(localStorage.getItem("loginUserInfo"));

  const { room } = useSelector(state => state.contactReducer);

  const messagesRef = useRef();

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
        socket.emit("chatMessage", { name: localStorageData, room, input });
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
        placeholder=" ✏️"
      ></input>
    </div>
  );
}

export default Chat;
