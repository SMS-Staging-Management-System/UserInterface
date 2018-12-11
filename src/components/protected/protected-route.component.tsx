import * as React from "react";
import {Redirect, Route} from 'react-router';
import { connect } from "react-redux";

/*
 *The protected route component
 */

// TODO: make ProtectedRoute type safe
// export interface ProtectedRouteProps extends RouteProps {
//   isAuthenticated: boolean;
//   authenticationPath: string;
// }

export const ProtectedRouteComponent = ({ component: Component, ...rest }: any) => {

  return (
    <Route
      {...rest}
      render={props => {
        if (rest.login) {
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
    login: state.user.login
  };
};

export default connect(mapStateToProps)(ProtectedRouteComponent);