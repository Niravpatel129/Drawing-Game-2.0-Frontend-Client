import React from "react";
import "./Message.scss";

import { EmojioneV4 } from "react-emoji-render";
import ReactTooltip from "react-tooltip";

function Message({ name, message, src, style }) {
  return (
    <>
      <div className="MessageContainer tooltip">
        {/* <span className="tooltiptext">{name || "Admin"}</span> */}
        <ReactTooltip place="top" type="dark" effect="solid" />

        <div className="imageContainer" data-tip={name || "Admin"}>
          <img
            src={
              src ||
              "https://static-cdn.jtvnw.net/jtv_user_pictures/46a42823-2fb3-447b-afae-5b62079ea973-profile_image-50x50.png"
            }
            alt="https://www.w3schools.com/w3images/bandmember.jpg"
          ></img>
        </div>
        <div className="Message">
          <p>
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
