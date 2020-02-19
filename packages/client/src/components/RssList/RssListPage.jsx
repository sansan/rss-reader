import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";

const RssListPage = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const entries = [
    {
      id: "string of text",
      updated: new Date(),
      author: {
        name: "Name Surname",
        uri: "link"
      },
      link: "link",
      title: "Title",
      summary: "Longer text.."
    }
  ];

  return (
    <Container component="main" maxWidth="xs">
      <h3>RSS List</h3>
    </Container>
  );
};

export default RssListPage;
