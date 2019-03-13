import * as React from "react";
import { Route } from 'react-router';
import { connect, ConnectedComponentClass } from "react-redux";
import LoginComponent from "../login/login.component";
import { IState } from "../../reducers";


const mapStateToProps = (state: IState) => ({ auth: state.managementState.auth });

export interface IProtectedRouteProps {
  component: ConnectedComponentClass<any, any>,
  allowedRoles: string[],
  auth: any,
  path: any
}


/*
 *The protected route component
 */
export const ProtectedRoute = (props: IProtectedRouteProps) => {
  const {component, auth, allowedRoles} = props;
  const Component = component as any;
  return (
    <Route
      render={props => {
        if (allowedRoles.some((allowedRole: string) => auth.currentUser.roles.includes(allowedRole))) {
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