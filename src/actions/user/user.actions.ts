import { RegisterDto } from '../../model/Register.model';
import * as awsCognito from 'amazon-cognito-identity-js';
import * as userClient from '../../axiosClients/userClient/userClient';
import { IUser } from 'src/model/User.model';

/**
 * userTypes
 */
export const userTypes = {
  COGNITO_SIGN_IN: 'COGNITO_SIGN_IN',
  FIRST_SIGN_IN:'FIRST_SIGN_IN',
  LOGIN:        'LOGIN',
  LOGOUT:       'LOGOUT',
  REGISTER:     'REGISTER',
  USER_INIT:    'USER_INIT'
}

/**
 * Verify with the server the uri token belong to an available cohort
 * @param token 
 */
export const tokenVerify = (token: string) => {
  userClient.verifyRegisterToken(token);
}

export const register = (registerDto: RegisterDto, token: string) => (dispatch) => {
  if( registerDto.password !== registerDto.confirmPassword ) {
    // TODO tell user to enter matching passwords
  } else {
    userClient.register(registerDto, token)
    .then(response => {
      console.log("error");
    })
    .catch(error => {
      console.log("error");
    });
  }
}

/**
 * User login 
 * @param username 
 * @param password 
 */
export const login = (username: string, password: string) => (dispatch) => {
  const authenticationData = {
    Password: password,
    Username: username,
  };

  const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
  const poolData = {
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID, 
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  };

  const userPool = new awsCognito.CognitoUserPool(poolData);
  const userData = {
    Pool: userPool,
    Username: username,
  };

  const cognitoUser = new awsCognito.CognitoUser(userData);
  // todo: update cognito user
  //  this.props.updateCognitoUser(cognitoUser);
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
      console.log("User Action Cog: "+ cognitoUser)
      dispatch({
        payload: {
          cogUser: cognitoUser
        },
        type: userTypes.COGNITO_SIGN_IN
      });
    }
  });
}

/**
 * Log a user out and delete jwt token from local store
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('REVATURE_SMS_COGNITO');
  dispatch({
    payload: {
      login: false
    },
    type: userTypes.LOGOUT
  });
}

/**
 * Log user in automatically if the cognito token is still in storage
 */
export const setup = () => (dispatch) => {
  if(localStorage.getItem('REVATURE_SMS_COGNITO')) {
    userClient.getUserFromCognito()
    .then(response => {
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
    })
  }
}

export const updateUser = (user: IUser) => (dispatch) => {
  if(localStorage.getItem('REVATURE_SMS_COGNITO')) {
    userClient.patchUser(user)
    .then(response => {
      // TODO message
    })
    .catch(error => {
      localStorage.removeItem('REVATURE_SMS_COGNITO');
    })
  }
}