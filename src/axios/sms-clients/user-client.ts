import { smsClient } from ".";
import { IUser } from "../../model/user.model";

const usersContext = '/users'

export const userClient = {
  saveUser(newUser: IUser) {
    return smsClient.post(usersContext, newUser);
  },
  findOneByEmail(email: string) {
    return smsClient.get(usersContext + `/email/${email}`);
  },

}
