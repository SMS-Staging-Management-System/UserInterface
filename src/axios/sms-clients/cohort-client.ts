import { smsClient } from ".";
import { ICohort } from "../../model/cohort";

const cohortContext = '/users'

export const cohortClient = {
  save(cohort: ICohort) {
    return smsClient.post(cohortContext, cohort);
  }
}