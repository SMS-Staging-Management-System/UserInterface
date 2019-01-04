import { smsClient } from ".";
import { ICognitoUserAddGroup } from "../../model/cognito-user-add-group.model";

const cognitoContext = '/cognito'
const urls = {
  addUserToGroup: cognitoContext + '/users/groups',
  auth: cognitoContext + '/auth',
  deleteUser: cognitoContext + '/users',
  findUsersByGroup: (groupName: string) => cognitoContext + `/users/groups/${groupName}`,
  registerUser: cognitoContext + '/users',
  removeUserFromGroup: cognitoContext + '/users/groups'
}

export const cognitoClient = {
  findUsersByGroup(groupName: string) {
    return smsClient.get(urls.findUsersByGroup(groupName));
  },
  addUserToGroup(body: ICognitoUserAddGroup) {
    return smsClient.put(urls.addUserToGroup, body);
  },
  auth() {
    return smsClient.get(urls.auth);
  }
}