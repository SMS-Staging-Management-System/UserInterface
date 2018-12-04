import axios from 'axios';
import { environment } from '../../environment';
import { RegisterDto } from '../../model/Register.model';
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
  axios.get(`${environment}/cohorts/verify?token=${token}`)
  .then(response => {
    // dispatch({
    //   type: userTypes.COHORT_TOKEN_VERIFY,
    //   payload: {
    //     registerToken: response.data.result // TODO token pass
    //   }
    // });
  })
  .catch(error => {
    // TODO error message
  });
}

export const register = (registerDto: RegisterDto, token: string) => {
  if( registerDto.password !== registerDto.confirmPassword ) {
    // TODO tell user to enter matching passwords
  } else {
    axios.post(`${environment}/users?token=${token}`, registerDto)
    .then(response => {
      // TODO snackbar
      // dispatch({
      //   type: snackbar.SNACKBAR_ADD,
      //   payload: {
      //     message: "Register successful"
      //   }
      // });
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
export const login = (username: string, password: string) => {
  let user:object = {
    "username": username,
    "password": password
  }
  axios.get(`${environment}/users`, user)
  .then(response => {
    localStorage.setItem('REVATURE_SMS_JWT', response.data.result.auth);
    // dispatch({
    //   type: userTypes.LOGIN,
    //   payload: {
    //     oldBounties: response.data.result
    //   }
    // });
  })
  .catch(error => {
    // TODO error message
  });
}

/**
 * Log a user out and delete jwt token from local store
 */
export const logout = () => {
  localStorage.removeItem('REVATURE_SMS_JWT');
  // dispatch({
  //   type: userTypes.LOGOUT,
  //   payload: {
  //     login: false
  //   }
  // });

  // dispatch({
  //   type: snackbar.SNACKBAR_ADD,
  //   payload: {
  //     message: "Logged out"
  //   }
  // });
}