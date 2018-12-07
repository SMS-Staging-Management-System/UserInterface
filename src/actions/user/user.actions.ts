import { RegisterDto } from '../../model/Register.model';
import * as userClient from '../../axiosClients/userClient/userClient';
import { IUser } from 'src/model/User.model';

/**
 * userTypes
 */
export const userTypes = {
  COHORT_TOKEN_VERIFY: 'COHORT_TOKEN_VERIFY',
  LOGIN:        'LOGIN',
  LOGOUT:       'LOGOUT',
  REGISTER:     'REGISTER'
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
  // TODO user cognito
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
        type: userTypes.LOGIN
      });
    })
    .catch(error => {
      localStorage.removeItem('REVATURE_SMS_COGNITO');
    })
  }
}