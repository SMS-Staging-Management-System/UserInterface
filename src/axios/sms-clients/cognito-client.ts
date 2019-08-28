import { smsClient } from ".";
import { ICognitoUserAddGroup } from "../../model/cognito-user-add-group.model";

const cognitoContext = '/cognito'
// const urls = {
//   deleteUser: cognitoContext + '/users',
//   removeUserFromGroup: cognitoContext + '/users/groups'
// }

export const cognitoClient = {
  findUsersByGroup(groupName: string) {
    return smsClient.get(cognitoContext + `/users/groups/${groupName}`);
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
  }
}