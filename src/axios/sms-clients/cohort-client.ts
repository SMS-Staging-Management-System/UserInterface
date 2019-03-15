import { smsClient } from ".";
import { ICohort } from "../../model/cohort";

const cohortContext = '/cohorts'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  },
  findAll() {
    return smsClient.get(cohortContext)
  }
}
