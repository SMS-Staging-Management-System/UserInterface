import { smsClient } from ".";
import { ICohort } from "../../model/cohort";
import { IUser } from "../../model/user.model";

const cohortContext = '/user-service/cohorts'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  },
  // findByToken(token: string) {
  //   return smsClient.get(cohortContext + `/token/${token}`)
  // },
  joinCohort(user:IUser, token:string){
    return smsClient.post(cohortContext + `/token/${token.toString()}`, user)
  },
  getAll: () => {
    return smsClient.get(cohortContext + "/cohorts");
  },

  findAll() {
    return smsClient.get(cohortContext)
  }
}
