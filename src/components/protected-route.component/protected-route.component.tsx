import * as React from "react";
import { Route } from 'react-router';
import { connect } from "react-redux";
import LoginComponent from "../login/login.container";
import { IState } from "../../reducers";


const mapStateToProps = (state: IState) => ({ auth: state.managementState.auth });

/*
 *The protected route component
 */
export const ProtectedRoute = ({ component: Component, auth, allowedRoles, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (allowedRoles.some(allowedRole => auth.currentUser.roles.includes(allowedRole))) {
          return <Component {...props} />;
        } else {
          return (
            <LoginComponent {...props}/>
          );
        }
      }}
    />
  );
}
export default connect(mapStateToProps)(ProtectedRoute);