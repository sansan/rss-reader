import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, RegisterPage } from "../Auth";
import { RssListPage } from "../RssList";
import { useStore } from "../../store";

const Router = () => (
  <Switch>
    <Route exact path="/">
      <PublicPage />
    </Route>
    <Route path="/public">
      <PublicPage />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/register">
      <RegisterPage />
    </Route>
    <PrivateRoute path="/feed">
      <RssListPage />
    </PrivateRoute>
    <Route path="*">
      <NoMatch />
    </Route>
  </Switch>
);

export default Router;

const NoMatch = () => {
  return <h3>404</h3>;
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { state } = useStore();
  const isAuthenticated = state.user.id ? true : false;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}
