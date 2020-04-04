import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useParams
} from "react-router-dom";
import Main from "./components/Main.js";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </Router>
  );
}
