import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="Landing">
      <h1>Landing</h1>
      <Link to="/canvas">
        <button>Go to Canvas</button>
      </Link>
      <br></br>
      <Link to="/join">
        <button>Go to Join page</button>
      </Link>
      <br></br>
      <Link to="/roomlist">
        <button>Go to Room List</button>
      </Link>
      <br></br>
      <Link to="/login">
        <button>Go to Login page</button>
      </Link>
      <br></br>
      <Link to="/logout">
        <button>Go to Logout page</button>
      </Link>
    </section>
  );
}

export default Landing;
