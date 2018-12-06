import { RegisterDto } from '../../model/Register.model';
import * as axiosClients from '../../axiosClients/axiosClient';
import * as userClient from '../../axiosClients/userClient/userClient';
import { User } from 'src/model/User.model';

/**
 * userTypes
 */
export const userTypes = {
  COHORT_TOKEN_VERIFY: 'COHORT_TOKEN_VERIFY',
  REGISTER:     'REGISTER',
  LOGIN:        'LOGIN',
  LOGOUT:       'LOGOUT'
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
    .then(response => {})
    .catch(error => {});
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
    type: userTypes.LOGOUT,
    payload: {
      login: false
    }
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
        type: userTypes.LOGIN,
        payload: {
          login: true,
          user:  <User> response.data.result.user
        }
      });
    })
    .catch(error => {
      localStorage.removeItem('REVATURE_SMS_COGNITO');
    })
  }
}