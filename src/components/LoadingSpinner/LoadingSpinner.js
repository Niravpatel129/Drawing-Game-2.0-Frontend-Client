import React from "react";
import "./LoadingSpinner.scss";
import { useSelector } from "react-redux";

function LoadingSpinner() {
  const { showing, message } = useSelector(state => state.SpinnerReducer);
  console.log(showing);
  return (
    <div
      className="LoadingSpinner"
      style={{ display: showing ? "flex" : "none" }}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default LoadingSpinner;
