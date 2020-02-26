import { smsClient } from ".";
import { ICognitoUserAddGroup } from "../../model/ICognitoUserAddGroup";
import { Auth } from 'aws-amplify';

const cognitoContext = '/cognito'
// const urls = {
//   deleteUser: cognitoContext + '/users',
//   removeUserFromGroup: cognitoContext + '/users/groups'
// }

export const cognitoClient = {
  findUsersByGroup(groupName: string, nextToken: string) {
    return smsClient.get(cognitoContext + `/users/groups/${groupName}${nextToken ? `?nextToken=${encodeURIComponent(nextToken)}` : ''}`);
  },
  addUserToGroup(body: ICognitoUserAddGroup) {
    return smsClient.put(cognitoContext + '/users/groups', body);
  },
  removeUserFromGroup(body: ICognitoUserAddGroup) {
    return smsClient.delete(cognitoContext + `/users/groups`, {
      data: body
    });
  },
  auth() {
    return smsClient.get(cognitoContext + '/auth');
  },
  resetPassword(email: string) {

    return smsClient.delete(cognitoContext + `/users/${email}/password`);

    // Auth.forgotPassword(email)
    // .then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }
}