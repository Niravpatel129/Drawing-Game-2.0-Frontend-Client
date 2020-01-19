import React, { useState, useRef, useEffect, useContext } from "react";
import "./Chat.scss";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import SocketContext from "../../context";

function Chat() {
  let { socket } = useContext(SocketContext);

  const [msg, addMsg] = useState([]);
  const [input, changeInput] = useState("");

  const { name, room } = useSelector(state => state.contactReducer);

  const messagesRef = useRef();

  useEffect(() => {
    socket.on("updateMessage", res => {
      addMsg(res);
    });
  }, [socket]);

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });

  const submitMessage = e => {
    if (e.charCode === 13) {
      if (input) {
        // on key press enter
        socket.emit("chatMessage", { name, room, input });
      }
      changeInput("");
    }
  };

  const renderMessage = () => {
    return msg.map((e, index) => {
      return <Message name={e.name} message={e.message} key={index} />;
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
      ></input>
    </div>
  );
}

export default Chat;
