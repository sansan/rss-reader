import React from "react";
import Store from "../../store";
import { BrowserRouter as Router } from "react-router-dom";
import Initialize from "./Initialize";
import Home from "../Home/Home.jsx";

const App = () => {
  return (
    <Store>
      <Initialize>
        <Router>
          <Home></Home>
        </Router>
      </Initialize>
    </Store>
  );
};

export default App;
