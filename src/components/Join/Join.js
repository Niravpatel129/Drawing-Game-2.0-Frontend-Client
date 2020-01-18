import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./Join.scss";
import { useHistory } from "react-router";

function SignIn() {
  const [name, setName] = useState("test");
  const [room, setRoom] = useState("test");
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: "SET_INFO", payload: { name, room } });
    history.push("/canvas");
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>

        <button onClick={handleSubmit} className={"button mt-20"} type="submit">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
