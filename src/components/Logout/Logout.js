import React from "react";
import { GoogleLogout } from "react-google-login";
import "./Logout.scss";
import { useHistory } from "react-router";

function Logout() {
  const history = useHistory();

  const logout = () => {
    console.log("Logged out");
    history.push("/");
  };
  return (
    <div className="Logout">
      <GoogleLogout
        clientId="991662408872-p8jcsttishtmdhrjrgehgug78ibacv1m.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={logout}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
