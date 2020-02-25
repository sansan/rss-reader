import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../shared/header.jsx";
import Router from "../Router/Router.jsx";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Router />
    </>
  );
};

export default withRouter(Home);
