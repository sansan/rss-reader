import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";
import { default as HttpClient } from "../../store/HttpClient";
import { useStore } from "../../store";

const RssListPage = () => {
  const baseUrl = "/rest/v1";
  const { state, dispatch } = useStore();
  const { stats, items } = state;

  useEffect(() => {
    if (!stats || !items) {
      HttpClient.get(`${baseUrl}/feed`).then(({ stats, items }) => {
        dispatch({ type: "SET_STATS", payload: stats });
        dispatch({ type: "SET_ITEMS", payload: items });
      });
    }
  }, []);

  let history = useHistory();
  let location = useLocation();

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
  console.log(items);
  return (
    <Container component="main" maxWidth="xs">
      <h3>RSS List</h3>
      <h4>Top 10 words</h4>
      <ul>
        {stats &&
          stats.map(item => (
            <li key={item.word}>{`${item.word}: ${item.count}`}</li>
          ))}
      </ul>
      <h4>Latest Articles</h4>
      <ul>{items && items.map(item => <li key={item.id}>{item.title}</li>)}</ul>
    </Container>
  );
};

export default RssListPage;
