import React from "react";
import "./Message.scss";

function Message() {
  return (
    <div className="Message">
      <div className="chatContainer">
        <div className="container">
          <h1>Hello</h1>
          <img
            src="https://www.w3schools.com/w3images/bandmember.jpg"
            alt="Avatar"
          />
          <p>Sweet! So, what do you wanna do today?????????</p>
        </div>
      </div>

      <input placeholder="Send"></input>
    </div>
  );
}

export default Message;
