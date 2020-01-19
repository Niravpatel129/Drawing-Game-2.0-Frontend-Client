import React from "react";
import "./Landing.scss";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="Landing">
      <h1>Landing</h1>
      <button>
        <Link to="/canvas">Go to Canvas</Link>
      </button>
      <br></br>
      <button>
        <Link to="/join">Go to Join page</Link>
      </button>
      <br></br>
      <button>
        <Link to="/roomlist">Go to Room List</Link>
      </button>
      <br></br>
      <button>
        <Link to="/login">Go to Login page</Link>
      </button>
      <br></br>
      <button>
        <Link to="/logout">Go to Logout page</Link>
      </button>
    </section>
  );
}

export default Landing;
