import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Join.scss";
import { useHistory } from "react-router";

function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginInfo = useSelector(state => state.userInfoReducer);

  const [name, setName] = useState(loginInfo.name || "test");
  const [room, setRoom] = useState(12);

  const handleSubmit = () => {
    dispatch({ type: "SET_INFO", payload: { name, room } });
    history.push("/canvas");
  };

  const handleNameInputChange = e => {
    if (!loginInfo) setName(e.target.value);
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
            value={name}
            onChange={handleNameInputChange}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            value={room}
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
