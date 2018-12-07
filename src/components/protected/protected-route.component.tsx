import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (rest.loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn.loggedIn
  };
};

const mapDispatchToProps = dispatch => {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);