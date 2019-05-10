import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => {
  let isSignedIn = false;
  let username = sessionStorage.getItem("username") === null ? "null" : sessionStorage.getItem("username")
  let token = sessionStorage.getItem("token") === null ? "null" : sessionStorage.getItem("token")
  if (username != "null" && token != "null") {
    isSignedIn = true
  }
  return (
    <Route
      {...rest}
      render={props => (
        isSignedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )

      )}
    />
  )
}