import * as React from "react";
import { Component } from 'react';
import { Route } from 'react-router';
import { connect, ConnectedComponentClass } from "react-redux";
import LoginComponent from "../login/login.container";
import { IState } from "../../reducers";




export interface IProtectedRouteProps {
  component: Component<any, any> | ConnectedComponentClass<any, any>,
  allowedRoles: string[],
  auth: any,
  path: any
}
/*
 *The protected route component
 */
export const ProtectedRoute = (props: IProtectedRouteProps,any) => {
  const { component, auth, allowedRoles } = props;
  const Component = component as any;
  return (
    <Route
      path={props.path}
      render={props => {
        if (allowedRoles.some((allowedRole: string) => auth.currentUser.roles.includes(allowedRole))) {
          return <Component {...props} />;
        } else {
          return (
            <LoginComponent {...props} />
            
          );
        }
      }}
    />
  );
}
const mapStateToProps = (state: IState) => ({ 
  auth: state.managementState.auth 
});
export default connect(mapStateToProps)(ProtectedRoute);
