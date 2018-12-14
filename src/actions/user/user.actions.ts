import * as awsCognito from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import * as userClient from '../../axiosClients/userClient/userClient';
import * as axiosClient from '../../axiosClients/axiosClient';
import { toast } from "react-toastify";
import { loadingTypes } from '../loading/loading.actions';
import { IUser } from 'src/model/User.model';
import { environment } from '../../environment';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';

/**
 * userTypes
 */
export const userTypes = {
  COGNITO_SIGN_IN: 'COGNITO_SIGN_IN',
  FIRST_SIGN_IN:'FIRST_SIGN_IN',
  LOGIN:        'LOGIN',
  LOGOUT:       'LOGOUT',
  REGISTER:     'REGISTER',
  SET_ROLE:     'SET_ROLE',
  USER_INIT:    'USER_INIT'
}

/**
 * User login 
 * @param username 
 * @param password 
 */
export const cognitoLogin = (username: string, password: string) => (dispatch) => {
  setLoading(true)(dispatch);
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
          isFirstSignin: true
        },
        type: userTypes.FIRST_SIGN_IN
      });
      dispatch({
        payload: {
          cogUser: cognitoUser
        },
        type: userTypes.COGNITO_SIGN_IN
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
          roles
        },
        type: userTypes.COGNITO_SIGN_IN
      });

      initUser()(dispatch)

      // Reset token once every 50 minutes
      window.setInterval(
        refreshCognitoSession()
      , 3000000);
      }
  });
  setLoading(false)(dispatch);
}

/**
 * Get current login user info from the server
 */
export const initUser = () => dispatch => {
  setLoading(true)(dispatch);

  userClient.getUserFromCognitoJwt()
  .then(response => {
    toast.success("Welcome back");
    dispatch({
      payload: {
        isLogin: true,
        user:  response.data.result as IUser
      },
      type: userTypes.USER_INIT
    });
  })
  .catch(error => {
    toast.warn("Jose server");
  })
  
  setLoading(false)(dispatch);

  // Reset token once every 50 minutes
  window.setInterval(
    refreshCognitoSession()(dispatch)
  , 3000000);
}

/**
 * 
 * @param registerDto 
 * @param token 
 */
export const register = (user: IUserCreateDto) => (dispatch) => {
  userClient.postUser(user)
  .then(response => {
    console.log("error");
  })
  .catch(error => {
    toast.warn("Server unable to register user")      
  });
}

/**
 * Attempt to log user in automatically if the cognito user is still in local storage
 */
export const refreshCognitoSession = () => (dispatch) => {
  setLoading(true)(dispatch);

  const poolData = {
    ClientId:   environment.cognitoClientId, 
    UserPoolId: environment.cognitoUserPoolId,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  console.log(cognitoUser);
  if (cognitoUser !== null) {

    // Get user session
    cognitoUser.getSession((getSessionError, session) => {
      if (getSessionError) {
        console.log(getSessionError.message || JSON.stringify(getSessionError));
        return null;
      }
      if(session) {
        const roles = session.getIdToken().payload['cognito:groups'];
    
        // Set redux cognito data
        dispatch({
          payload: {
            cogUser:  cognitoUser,
            roles
          },
          type: userTypes.COGNITO_SIGN_IN
        });

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
                }
                else{
                  console.log("TOKEN SUCCESSFULLY UPDATED");
                }
              });
            }
          });
        }

        // Put jwt into axios client
        axiosClient.addCognitoToHeader(session.getIdToken().getJwtToken());
        setLoading(false)(dispatch);
        return session;
      }
    });
  } else {
    setLoading(false)(dispatch);
    return null;
  }
}

export const setup = () => dispatch => {
  // Refresh user session if the user session token is still valid 
  const session = refreshCognitoSession()(dispatch);

  // Get user info from server if session is valid
  if(session !== null) {
    initUser()(dispatch);
  }
}

/**
 * Update user info
 * @param user 
 */
export const updateUser = (user: IUser) => (dispatch) => {
  userClient.patchUser(user)
  .then(response => {
    toast.success("Info updated")
  })
  .catch(error => {
    toast.warn("Server error")
  })
}

/**
 * Log a user out and delete jwt token from local store
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('REVATURE_SMS_COGNITO');
  dispatch({
    payload: {
      isLogin: false
    },
    type: userTypes.LOGOUT
  });
}

/**
 * Set the loading screen status
 * @param loading 
 */
export const setLoading = (loading: boolean) => dispatch => {
  dispatch({
    payload: {
      isLoading: loading
    },
    type: loadingTypes.IS_LOADING
  });
}