import React from "react";
import "./ProfileCard.scss";
import ReactTooltip from "react-tooltip";

class ProfileCard extends React.Component {
  render() {
    const { src, points, drawing, index, name } = this.props;
    const border = drawing ? "2.8px solid white" : "none";
    return (
      <div className="ProfileCard tooltip">
        {index === 0 && points !== 0 ? (
          <img
            alt="crown"
            className="crown"
            src="https://i.imgur.com/4WSmzcl.png"
          ></img>
        ) : (
          ""
        )}
        <div data-tip={name}>
          <div className="imageContainer" style={{ border: border }}>
            <div
              className="pencilWrapper"
              style={{ display: drawing ? "block" : "none" }}
            ></div>
            <img
              className="avatar"
              alt="avatar"
              src={
                src ||
                "https://lh3.googleusercontent.com/-ExcCE_u-6AA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re0f6aLElaFPaWzTzCEPQKovJ8fsw/s96-c/photo.jpg"
              }
            ></img>
          </div>
          <p>{points.toLocaleString("en", { useGrouping: true }) || 0}pts</p>
        </div>

        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
    );
  }
}

export default ProfileCard;
