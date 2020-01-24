import React from "react";
import "./Message.scss";

import { EmojioneV4 } from "react-emoji-render";

function Message({ name, message, src, style }) {
  const adminStyle = {};

  return (
    <>
      <div className="MessageContainer" style={style}>
        <img
          src={
            src ||
            "https://vignette.wikia.nocookie.net/p__/images/8/83/Meap_with_mustache.png/revision/latest/scale-to-width-down/340?cb=20111211222815&path-prefix=phineasandferbenespanol%2Fes"
          }
          alt="https://www.w3schools.com/w3images/bandmember.jpg"
        ></img>
        <div className="Message">
          <h4>{name || "ADMIN"}</h4>
          <p style={adminStyle}>
            <EmojioneV4
              size={64}
              text={message || "You need to enable JavaScript to run this app."}
            />
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
