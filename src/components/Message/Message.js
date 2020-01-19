import React from "react";
import "./Message.scss";

function Message({ name, message, src }) {
  return (
    <>
      <div className="MessageContainer">
        <img
          src={src || "https://www.w3schools.com/w3images/bandmember.jpg"}
          alt="https://www.w3schools.com/w3images/bandmember.jpg"
        ></img>
        <div className="Message">
          <h4>{name || "Guest"}</h4>
          <p>{message || "You need to enable JavaScript to run this app."}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
