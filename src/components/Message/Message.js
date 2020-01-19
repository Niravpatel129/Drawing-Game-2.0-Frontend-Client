import React from "react";
import "./Message.scss";

function Message({ message }) {
  const generateRandomNumber = () => {
    return Math.random() * (255 - 0) + 0;
  };
  return (
    <>
      <div className="MessageContainer">
        <img
          src="https://www.w3schools.com/w3images/bandmember.jpg"
          alt="https://www.w3schools.com/w3images/bandmember.jpg"
        ></img>
        <div className="Message">
          <h4
            style={{
              color: `rgba(${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()})`
            }}
          >
            RedSkyez
          </h4>
          <p>{message || "You need to enable JavaScript to run this app."}</p>
        </div>
      </div>
    </>
  );
}

export default Message;
