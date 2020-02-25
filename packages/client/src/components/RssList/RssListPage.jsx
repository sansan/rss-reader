import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { default as HttpClient } from "../../store/HttpClient";
import { useStore } from "../../store";

const RssListPage = () => {
  const baseUrl = "/rest/v1";
  const { state, dispatch } = useStore();
  const { stats, posts, loading } = state;
  const { GET_FEED } = loading;
  useEffect(() => {
    if (!stats || !posts) {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "GET_FEED", value: true }
      });
      HttpClient.get(`${baseUrl}/feed`).then(({ stats, items }) => {
        dispatch({ type: "SET_STATS", payload: stats });
        dispatch({ type: "SET_ITEMS", payload: items });
        dispatch({
          type: "SET_LOADING",
          payload: { key: "GET_FEED", value: false }
        });
      });
    }
  }, []);

  if (GET_FEED) {
    return <p>loading...</p>;
  }

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
      <ul>{posts && posts.map(item => <li key={item.id}>{item.title}</li>)}</ul>
    </Container>
  );
};

export default RssListPage;
