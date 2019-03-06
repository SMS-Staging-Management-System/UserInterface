// import * as awsCognito from 'amazon-cognito-identity-js';
// import * as AWS from 'aws-sdk';
import { environment } from '../../environment';
import { History } from 'history';
import { ICognitoUser } from '../../model/cognito-user.model';
// import { toast } from 'react-toastify';
import Amplify, { Auth } from 'aws-amplify';
import { refreshJwt } from '../../axios/sms-clients';
import { getUserByEmail } from '../current-sms-user/current-sms-user.actions';
// import Axios from 'axios';

Amplify.configure({
  Auth: {
    region: environment.awsRegion,
    userPoolId: environment.cognitoUserPoolId,
    userPoolWebClientId: environment.cognitoClientId,
  }
})


export const authTypes = {
  LOGOUT: 'LOGOUT',
  UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
}

export const cognitoLogin = (username: string, password: string, history: History) => (dispatch) => {

  Auth.signIn({
    password, // Optional, the password
    username, // Required, the username

  }).then(user => {
    console.log('here', user);
    history.push('/check-ins');
    setup()(dispatch);
  })
    .catch(err => console.log(err));
}


export const updateCurrentUser = (currentUser: ICognitoUser) => {
  return {
    payload: {
      currentUser
    },
    type: authTypes.UPDATE_CURRENT_USER
  }
}

/**
 * Get current login user info from the server
 */
export const setup = () => (dispatch) => {
  Auth.currentAuthenticatedUser()
    .then(user => {
      // initialize the jwt for axios
      Auth.currentSession()
        .then(data => {
          refreshJwt(data.getIdToken().getJwtToken());
          const userAttributes = data.getIdToken().payload;
          const currentUser = {
            email: userAttributes.email,
            roles: userAttributes['cognito:groups'] || [],
          }
          // Set redux cognito data
          dispatch(updateCurrentUser(currentUser));
          console.log('calling to get user by emil')
          getUserByEmail(userAttributes.email)(dispatch);
        })

      // create interval to refresh the jwt periodically
      setInterval(() => {
        Auth.currentSession()
          .then(data => {
            console.log(data.getIdToken().getJwtToken());
            refreshJwt(data.getIdToken().getJwtToken());
          })
      }, 300000)


    })
    .catch(e => {
      return;
    })
}


export const logout = () => {
  Auth.signOut();
  return {
    payload: {},
    type: authTypes.LOGOUT
  }
}