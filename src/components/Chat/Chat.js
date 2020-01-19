import React, { useState, useRef, useEffect } from "react";
import "./Chat.scss";
import Message from "../Message/Message";

function Chat() {
  const [messages, addMessage] = useState([]);
  const [input, changeInput] = useState("");

  const messagesRef = useRef();

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });

  const submitMessage = e => {
    if (e.charCode === 13) {
      if (input) {
        addMessage([
          ...messages,
          <Message message={input} key={messages.length + 1} />
        ]);
      }
      changeInput("");
    }
  };

  return (
    <div className="Chat">
      <div className="messages" ref={messagesRef}>
        {messages.map((e, index) => {
          return e;
        })}
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
