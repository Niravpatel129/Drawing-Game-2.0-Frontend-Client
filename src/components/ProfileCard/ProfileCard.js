import React from "react";
import "./ProfileCard.scss";

class ProfileCard extends React.Component {
  render() {
    const { src, points, drawing, index, name } = this.props;
    const border = drawing ? "2px solid white" : "none";
    return (
      <div className="ProfileCard tooltip">
        <span className="tooltiptext">{name || "user"}</span>

        {index === 0 ? (
          <img
            alt="crown"
            className="crown"
            src="https://i.imgur.com/4WSmzcl.png"
          ></img>
        ) : (
          ""
        )}
        <div className="imageContainer" style={{ border: border }}>
          <img
            alt="avatar"
            src={
              src ||
              "https://lh3.googleusercontent.com/-ExcCE_u-6AA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re0f6aLElaFPaWzTzCEPQKovJ8fsw/s96-c/photo.jpg"
            }
          ></img>
        </div>
        <p>{points.toLocaleString("en", { useGrouping: true }) || 0}pts</p>
      </div>
    );
  }
}

export default ProfileCard;
