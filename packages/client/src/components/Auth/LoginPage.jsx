import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Form from "./Form.jsx";

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  // let login = () => {
  //   fakeAuth.authenticate(() => {
  //     history.replace(from);
  //   });
  // };

  const handleSubmit = e => {
    e.preventDefault();
    history.push("");
  };

  return <Form onSubmit={handleSubmit} title="Sign In" />;
};

export default LoginPage;
