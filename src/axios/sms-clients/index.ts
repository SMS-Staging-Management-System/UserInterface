import axios from 'axios';
import { environment } from '../../environment';

let jwt = '';

export const smsClient = axios.create({
  baseURL: environment.smsContext,
  headers: {
    'Content-Type': 'application/json'
  }
});
<<<<<<< HEAD
//COMMENT OUT BLOCK BELOW TO MAKE BACKEND CALLS WORK (AS OF 8/26/2019)
// Create interceptor to add the token into the header for every request
//may need to comment the bottom for checking to work
smsClient.interceptors.request.use((config) => {
 config.headers.Authorization = jwt
 return config;
=======

// Create interceptor to add the token into the header for every request
smsClient.interceptors.request.use((config) => {
  config.headers.Authorization = jwt
  return config;
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
});

export function refreshJwt(newJwt: string) {
  jwt = newJwt;
}
