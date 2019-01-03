// import * as awsCognito from 'amazon-cognito-identity-js';
// import * as AWS from 'aws-'
// import { environment } from '../../environment';
// import { History } from 'history';
// import {authTypes} from '../../actions/auth//auth.actions';
// export const cognitoLogin = (username: string, password: string, history: History) => (dispatch) => {
//   const authenticationData = {
//     Password: password,
//     Username: username,
//   };

//   const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
//   const poolData = {
//     ClientId:   environment.cognitoClientId, 
//     UserPoolId: environment.cognitoUserPoolId,
//   };

//   const userPool = new awsCognito.CognitoUserPool(poolData);
//   const userData = {
//     Pool:     userPool,
//     Username: username,
//   };

//   const cognitoUser = new awsCognito.CognitoUser(userData);
//   cognitoUser.authenticateUser(authenticationDetails, {
//     newPasswordRequired: (userAttributes, requiredAttributes) => {
//       // dispatch({
//       //   payload: {
//       //     cogUser: cognitoUser,
//       //     isFirstSignin: true
//       //   },
//       //   type: userTypes.FIRST_SIGN_IN
//       // });
//       alert('new password required')
//     },
//     onFailure: (error) => {
//       console.log(error);
//     },
//     onSuccess: (result: awsCognito.CognitoUserSession) => {
//       const roles = result.getIdToken().payload['cognito:groups'];

//       // dispatch({
//       //   payload: {
//       //     cogUser:  cognitoUser,
//       //     isLogin: true,
//       //     roles
//       //   },
//       //   type: userTypes.COGNITO_SIGN_IN
//       // });

//       history.push("/dashboard/check-ins");

//       // Reset token once every 50 minutes
//       window.setInterval(
//         () => refreshCognitoSession()(dispatch)
//       , 3000000);
//       }
//   });
// }

// /**
//  * Attempt to log user in automatically if the cognito user is still in local storage
//  */
// export const refreshCognitoSession = () => (dispatch) => {
//   const cognitoUser = getCurrentCognitoUser();
//   if (cognitoUser !== null) {
//     // Get user session
//     cognitoUser.getSession((getSessionError, session) => {
//       if (getSessionError) {
//         // console.log(getSessionError.message || JSON.stringify(getSessionError));
//         return false;
//       }
//       if(session) {
//         const userAttributes = session.getIdToken().payload;
//         console.log(userAttributes)
//         // Set redux cognito data
//         dispatch({
//           payload: {

//           },
//           type: authTypes.UPDATE_CURRENT_USER
//         });

//         const refreshToken = session.getRefreshToken();
//         const awsCreds: any = AWS.config.credentials;

//         // Refresh session if needed
//         if (awsCreds !== null && awsCreds.needsRefresh()) {
//           cognitoUser.refreshSession(refreshToken, (refreshSessionError, refreshSession) => {
//             if(refreshSessionError) {
//               console.log(refreshSessionError);
//             } 
//             else {
//               awsCreds.params.Logins[`cognito-idp.${environment.awsRegion}.amazonaws.com/${environment.cognitoUserPoolId}`]  = refreshSession.getIdToken().getJwtToken();
//               awsCreds.refresh((refreshTokenError)=> {
//                 if(refreshTokenError)  {
//                   console.log(refreshTokenError);
//                   isLoading(false)(dispatch); 
//                   return true;
//                 }
//                 else{
//                   isLoading(false)(dispatch); 
//                   return true;
//                 }
//               });
//             }
//           });
//         }
//         return true;
//       } else {
//         return false;
//       }
//     });
//   } else {
//     return false;
//   }
//   return true;
// }


// /**
//  * Return current cognito user from session
//  */
// export const getCurrentCognitoUser = () => {
//   const poolData = {
//     ClientId:   environment.cognitoClientId, 
//     UserPoolId: environment.cognitoUserPoolId,
//   };

//   const userPool = new awsCognito.CognitoUserPool(poolData);
//   const cognitoUser = userPool.getCurrentUser();
//   return cognitoUser;
// }
