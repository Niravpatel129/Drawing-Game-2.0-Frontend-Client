import React from "react";
import { GoogleLogin } from "react-google-login";
import "./Login.scss";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = response => {
    localStorage.setItem("loginUserInfo", JSON.stringify(response.profileObj));
    dispatch({ type: "LOGIN_USER", payload: response.profileObj });
    history.push("/join");
  };

  const failed = res => {
    console.log(res);
  };

  return (
    <div className="Login">
      <h4>Login</h4>
      <GoogleLogin
        clientId="991662408872-p8jcsttishtmdhrjrgehgug78ibacv1m.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={failed}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Login;
