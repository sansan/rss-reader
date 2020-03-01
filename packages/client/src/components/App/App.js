import React from "react";
import StoreContext from 'storeon/react/context'
import { store } from "../../store";
import { BrowserRouter as Router } from "react-router-dom";
import Initialize from "./Initialize";
import Home from "../Home/Home.jsx";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Initialize>
        <Router>
          <Home></Home>
        </Router>
      </Initialize>
    </StoreContext.Provider>
  );
};

export default App;
