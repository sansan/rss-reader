import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import useStoreon from 'storeon/react';

const RssListPage = () => {
  const { stats, posts, loading, dispatch } = useStoreon('stats', 'posts', 'loading');
  const isLoading = loading.includes('FEED');

  useEffect(() => {
    if(!isLoading && !stats.length && !posts.length){
      dispatch('posts/get');
    }
  }, []);

  if (isLoading) {
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
