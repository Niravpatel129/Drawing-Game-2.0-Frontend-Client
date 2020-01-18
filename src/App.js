import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Canvas from "./components/Canvas/Canvas";
import Join from "./components/Join/Join";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/join" exact>
            <Join />
          </Route>
          <Route path="/canvas" exact>
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
