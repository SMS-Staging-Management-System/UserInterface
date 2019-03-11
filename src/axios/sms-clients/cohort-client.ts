import { smsClient } from ".";
import { ICohort } from "../../model/cohort";

const cohortContext = '/cohorts'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  },
  findByToken(token: string) {
    return smsClient.get(cohortContext + `/token/${token}`)
  }
}