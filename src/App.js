import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Canvas from "./components/Canvas/Canvas";
import Join from "./components/Join/Join";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/join" exact>
          <Join />
        </Route>
        <Route path="/canvas" exact>
          <Canvas />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
