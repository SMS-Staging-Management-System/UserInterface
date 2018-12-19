import * as React from "react";
import {Redirect, Route} from 'react-router';
import { connect } from "react-redux";
import { IState } from "src/reducers";
import * as awsCognito from 'amazon-cognito-identity-js';
import { environment } from '../../environment';

/*
 *The protected route component
 */

// TODO: make ProtectedRoute type safe
// export interface ProtectedRouteProps extends RouteProps {
//   isAuthenticated: boolean;
//   authenticationPath: string;
// }

export const checkSession = () => {
  
  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();

console.log(cognitoUser);
  if (cognitoUser !== null) {
    // Get user session
    // cognitoUser.getSession((getSessionError, session) => {
      return true;
  //     if (getSessionError) {
  //       console.log("a");
  //       return false;
  //     }
  //     if (session) {
  //       return true;
  //     }
  //     console.log("b");
  //     return false;
  //   })
  //   console.log("c")
  //   return false;
  }
  else {
    console.log("d")
    return false;
  }
}




export const ProtectedRoute = ({ component: Component, ...rest }: any) => {

  

  return (
    <Route
      {...rest}
      render={props => {
        console.log(checkSession());
        if (checkSession()) {
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

const mapStateToProps = (state: IState) => (state.user);

export default connect(mapStateToProps)(ProtectedRoute);