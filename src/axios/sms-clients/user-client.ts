import { smsClient } from ".";
import { IUser } from "../../model/user.model";

const usersContext = '/users'

export const userClient = {
  saveUser(newUser: IUser) {
    return smsClient.post(usersContext, newUser);
  },

  findAllByCohortId: (cohortId: number) => {
    return smsClient.get(`${usersContext}/cohort/${cohortId}`)
  }
}