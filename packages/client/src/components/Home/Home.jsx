import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../shared/header.jsx";
import Router from "../Router/Router.jsx";

const Home = () => {
  let posts = <p>Loading...</p>;

  return (
    <>
      <Header></Header>
      <Router />
    </>
  );
};

export default withRouter(Home);
