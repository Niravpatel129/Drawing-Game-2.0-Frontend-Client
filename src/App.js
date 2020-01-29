import React from "react";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";
// import Landing from "./components/Landing/Landing";
import Canvas from "./components/Canvas/Canvas";
import Join from "./components/Join/Join";
import SocketProvider from "./provider";
import RoomList from "./components/RoomList/RoomList";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import NotificationModule from "./components/NotificationModule/NotificationModule";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <LoadingSpinner />
        <NotificationModule />
        <BrowserRouter>
          <Route path="/" exact>
            <RoomList />
          </Route>
          <Route path="/join" exact>
            <Join />
          </Route>
          <Route path="/canvas" exact>
            <Canvas />
          </Route>
          <Route path="/roomlist" exact>
            <RoomList />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
        </BrowserRouter>
      </div>
    </SocketProvider>
  );
}

export default App;
