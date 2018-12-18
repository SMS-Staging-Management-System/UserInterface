import * as axiosClient from '../../axiosClients/axiosClient';
import * as awsCognito from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import * as userClient from '../../axiosClients/userClient/userClient';
import { environment } from '../../environment';
import { userTypes } from './user.actions';
import { IUser } from 'src/model/User.model';
import { isLoading } from  '../loading/loading.actions';
import { History } from 'history';
  
/**
 * Get current login user info from the server
 */
export const initUser = (dispatch) => {
  isLoading(true); 
  
  userClient.getUserFromCognitoJwt()
  .then(response => {
    dispatch({
      payload: {
        user:  response.data as IUser
      },
      type: userTypes.USER_INIT
    });
  })
  .catch(error => {
    console.log(error)
  })
  
  isLoading(false); 

  // Reset token once every 50 minutes
  window.setInterval(
    () => refreshCognitoSession()(dispatch)
  , 3000000);
}

export const cognitoLogin = (username: string, password: string, history: History) => (dispatch) => {
  isLoading(true);  
  const authenticationData = {
    Password: password,
    Username: username,
  };

  const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const userData = {
    Pool:     userPool,
    Username: username,
  };

  const cognitoUser = new awsCognito.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    newPasswordRequired: (userAttributes, requiredAttributes) => {
      dispatch({
        payload: {
          cogUser: cognitoUser,
          isFirstSignin: true
        },
        type: userTypes.FIRST_SIGN_IN
      });
    },
    onFailure: (error) => {
      console.log(error);
    },
    onSuccess: (result: awsCognito.CognitoUserSession) => {
      const roles = result.getIdToken().payload['cognito:groups'];
      
      // Set cognito jwt to header
      axiosClient.addCognitoToHeader(result.getIdToken().getJwtToken());
      dispatch({
        payload: {
          cogUser:  cognitoUser,
          isLogin: true,
          roles
        },
        type: userTypes.COGNITO_SIGN_IN
      });

      history.push("/dashboard");

      initUser(dispatch)

      // Reset token once every 50 minutes
      window.setInterval(
        () => refreshCognitoSession()(dispatch)
      , 3000000);
      }
  });
  isLoading(true);
}

/**
 * Attempt to log user in automatically if the cognito user is still in local storage
 */
export const refreshCognitoSession = () => (dispatch) => {
  isLoading(true); 

  const cognitoUser = getCurrentCognitoUser();
  if (cognitoUser !== null) {

    // Get user session
    cognitoUser.getSession((getSessionError, session) => {
      if (getSessionError) {
        // console.log(getSessionError.message || JSON.stringify(getSessionError));
        isLoading(false); 
        return false;
      }
      if(session) {
        const roles = session.getIdToken().payload['cognito:groups'];
    
        // Set redux cognito data
        dispatch({
          payload: {
            cogUser:  cognitoUser,
            isLogin: true,
            roles
          },
          type: userTypes.COGNITO_SIGN_IN
        });

        // Put jwt into axios client
        axiosClient.addCognitoToHeader(session.getIdToken().getJwtToken());
        const refreshToken = session.getRefreshToken();
        const awsCreds: any = AWS.config.credentials;

        // Refresh session if needed
        if (awsCreds !== null && awsCreds.needsRefresh()) {
          cognitoUser.refreshSession(refreshToken, (refreshSessionError, refreshSession) => {
            if(refreshSessionError) {
              console.log(refreshSessionError);
            } 
            else {
              awsCreds.params.Logins[`cognito-idp.${environment.awsRegion}.amazonaws.com/${environment.cognitoUserPoolId}`]  = refreshSession.getIdToken().getJwtToken();
              awsCreds.refresh((refreshTokenError)=> {
                if(refreshTokenError)  {
                  console.log(refreshTokenError);
                  isLoading(false); 
                  return true;
                }
                else{
                  isLoading(false); 
                  return true;
                }
              });
            }
          });
        }
        isLoading(false); 
        return true;
      } else {
        isLoading(false); 
        return false;
      }
    });
  } else {
    isLoading(false); 
    return false;
  }
  isLoading(false); 
  return true;
}

/**
 * Return current cognito user from session
 */
export const getCurrentCognitoUser = () => {
  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  return cognitoUser;
}