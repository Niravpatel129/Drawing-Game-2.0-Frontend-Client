import React from "react";
import "./LoadingSpinner.scss";
import { useSelector } from "react-redux";

function LoadingSpinner() {
  const Loading = useSelector(state => state.SpinnerReducer);

  console.log(Loading);
  return (
    <div
      className="LoadingSpinner"
      style={{ display: Loading ? "flex" : "none" }}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
