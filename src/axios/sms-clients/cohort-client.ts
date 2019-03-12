import { smsClient } from ".";
import { ICohort } from "../../model/cohort";
//import { joinCohort } from "../../actions/join-cohort/join-cohort.actions";
import { IUser } from "../../model/user.model";

const cohortContext = '/cohorts'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  },
  // findByToken(token: string) {
  //   return smsClient.get(cohortContext + `/token/${token}`)
  // },
  joinCohort(user:IUser, token:string){
    return smsClient.post(cohortContext + `/token/${token.toString()}`, user)
  }
}