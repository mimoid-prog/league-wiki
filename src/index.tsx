import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Global from "./Global";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Global />
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);
