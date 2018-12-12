import { RegisterDto } from '../../model/Register.model';
import * as awsCognito from 'amazon-cognito-identity-js';
import * as userClient from '../../axiosClients/userClient/userClient';
import { toast } from "react-toastify";
import { loadingTypes } from '../loading/loading.actions';
import { IUser } from 'src/model/User.model';
import { environment } from '../../environment';

// const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const AWS = require('amazon-cognito-identity-js');

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
 * 
 * @param registerDto 
 * @param token 
 */
export const register = (registerDto: RegisterDto, token: string) => (dispatch) => {
  if( registerDto.password !== registerDto.confirmPassword ) {
    toast.warn("Password confirmation does not match")
  } else {
    userClient.register(registerDto)
    .then(response => {
      console.log("error");
    })
    .catch(error => {
      toast.warn("Server unable to register user")      
    });
  }
}

/**
 * User login 
 * @param username 
 * @param password 
 */
export const cognitoLogin = (username: string, password: string) => (dispatch) => {
  dispatch({
    payload: {
      isLoading: true
    },
    type: loadingTypes.IS_LOADING
  });
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
  cognitoUser.getUserAttributes((err, result) => {
    if (err) {
        alert(err.message || JSON.stringify(err));
        return;
    }
    for (const i in result) {
      if(true) {
        console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
      }
    }
  });

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
      localStorage.setItem('REVATURE_SMS_COGNITO', result.getIdToken().getJwtToken());
      console.log(`TOKEN HERE: ${result.getIdToken().getJwtToken()}`)

      dispatch({
        payload: {
          cogUser: cognitoUser
        },
        type: userTypes.COGNITO_SIGN_IN
      });
    }
  });
  dispatch({
    payload: {
      isLoading: false
    },
    type: loadingTypes.IS_LOADING
  });
}

/**
 * Get current login user info from the server
 */
export const initUser = () => dispatch => {
  userClient.getUserFromCognitoJwt()
  .then(response => {
    toast.success("Welcome back");
    dispatch({
      payload: {
        login: true,
        user:  response.data.result.user as IUser
      },
      type: userTypes.USER_INIT
    });
  })
  .catch(error => {
    localStorage.removeItem('REVATURE_SMS_COGNITO');
    toast.warn("Server error");
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
 * Attempt to log user in automatically if the cognito user is still in local storage
 */
export const setup = () => (dispatch) => {
  // const poolData = {
  //   ClientId:   environment.cognitoClientId, 
  //   UserPoolId: environment.cognitoUserPoolId,
  // };

  // const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  // const cognitoUser = userPool.getCurrentUser();

  // if (cognitoUser != null) {
  //   const session = cognitoUser.getSession(function(err, session) {
  //       if (err) {
  //         console.log(err.message || JSON.stringify(err));
  //         return;
  //       }
  //   });
  //   const refresh_token = session.getRefreshToken();
  //   localStorage.setItem('REVATURE_SMS_COGNITO', refresh_token);
    // if (AWS.config.credentials.needsRefresh()) {
    //   cognitoUser.refreshSession(refresh_token, (err, session) => {
    //     if(err) {
    //       console.log(err);
    //     } 
    //     else {
    //       AWS.config.credentials.params.Logins[`cognito-idp.${environment.awsRegion}.amazonaws.com/${environment.cognitoUserPoolId}`]  = session.getIdToken().getJwtToken();
    //       localStorage.setItem('REVATURE_SMS_COGNITO', session.getIdToken().getJwtToken());
    //       initUser();

    //       AWS.config.credentials.refresh((err)=> {
    //         if(err)  {
    //           console.log(err);
    //         }
    //         else{
    //           console.log("TOKEN SUCCESSFULLY UPDATED");
    //         }
    //       });
    //     }
    //   });
    // }
  // }
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