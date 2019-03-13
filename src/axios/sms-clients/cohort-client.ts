import { smsClient } from ".";
import { ICohort } from "../../model/cohort";

const cohortContext = '/cohorts'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  },
  
  getAll: () => {
    return smsClient.get(cohortContext + "/cohorts");
  },

  findAll() {
    return smsClient.get(cohortContext)
  }
}
