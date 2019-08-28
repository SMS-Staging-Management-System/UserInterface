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
<<<<<<< HEAD
  removeUserFromGroup(body: ICognitoUserAddGroup) {
    return smsClient.delete(cognitoContext + `/users/groups`, {
      data: body
    });
  },
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  auth() {
    return smsClient.get(cognitoContext + '/auth');
  },
  resetPassword(email: string) {
    return smsClient.delete(cognitoContext + `/users/${email}/password`);
  }
}