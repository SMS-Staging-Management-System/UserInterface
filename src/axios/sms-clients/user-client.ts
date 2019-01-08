import { smsClient } from ".";
import { IUser } from "../../model/user.model";

const usersContext = '/users'
const urls = {
  saveUser: usersContext
}

export const userClient = {
  saveUser(newUser: IUser) {
    return smsClient.post(urls.saveUser, newUser);
  }
}