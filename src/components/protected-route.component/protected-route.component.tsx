import * as React from "react";
import { Route } from 'react-router';
<<<<<<< HEAD
import { connect } from "react-redux";
import LoginComponent from "../login/login.container";
=======
import { connect, ConnectedComponentClass } from "react-redux";
import LoginComponent from "../login/login.component";
>>>>>>> be512af81b57dc0c0307296a81624dd642b5a07e
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
            <LoginComponent {...props} />
          );
        }
      }}
    />
  );
}
export default connect(mapStateToProps)(ProtectedRoute);
// Type '{ history: History<any>; location: Location<any>; match: match<any>; staticContext?: StaticContext | undefined; }'
// is missing the following properties from type 'Readonly<Pick<ILoginProps, "confirmationPassword" | "newPassword" | "passwordNeedsReset" | "incorrectUserPass" | 
// "verificationCode" | "needsVerificationCode" | "showPasswordTip" | "history" | "location" | "match" | "staticContext"> 
// & ILoginState>': confirmationPassword, newPassword, passwordNeedsReset, incorrectUserPass, and 6 more.