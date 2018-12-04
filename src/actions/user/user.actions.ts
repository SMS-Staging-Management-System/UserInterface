import { RegisterDto } from '../../model/Register.model';
import * as axiosClients from '../../axiosClients/axiosClient';
import * as userClient from '../../axiosClients/userClients/userClients';

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
    .then(response => {
      dispatch({
        type: userTypes.LOGIN,
        payload: {
          login: true,
          user: response.data.result.user
        }
      });
    })
    .catch(error => {
      // TODO error message
    });
  }
}

/**
 * User login 
 * @param username 
 * @param password 
 */
export const login = (username: string, password: string) => (dispatch) => {
  userClient.login(username, password)
  .then(response => {
    axiosClients.addJwtToHeader(response.data.result.auth);
    dispatch({
      type: userTypes.LOGIN,
      payload: {
        login: true,
        user: response.data.result.user
      }
    });
  })
  .catch(error => {
    // TODO error message
  });
  
}

/**
 * Log a user out and delete jwt token from local store
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('REVATURE_SMS_JWT');
  dispatch({
    type: userTypes.LOGOUT,
    payload: {
      login: false
    }
  });

  // dispatch({
  //   type: snackbar.SNACKBAR_ADD,
  //   payload: {
  //     message: "Logged out"
  //   }
  // });
}


export const setup = () => (dispatch) => {
  if(localStorage.getItem('REVATURE_SMS_JWT')) {
    userClient.getUserFromJwt()
    .then(response => {
      axiosClients.addJwtToHeader(response.data.result.auth)
      dispatch({
        type: userTypes.LOGIN,
        payload: {
          login: true,
          user:  response.data.result.user
        }
      });
    })
    .catch(error => {
      localStorage.removeItem('REVATURE_SMS_JWT');
    })
  }
}