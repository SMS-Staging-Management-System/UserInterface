import { smsClient } from ".";
import { ICohort } from "../../model/cohort";
import { IUser } from "../../model/user.model";

const cohortContext = '/user-service/cohorts'
const cohortNameSort = '/user-service/page';
const aliasNameSort = '/user-service/page';

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
  },
  async getName(cohortName: string){
    if(!cohortName){
      return [];
    }
    let cohortNames;
    await smsClient.get(`${cohortNameSort}/${cohortName}`)
      .then(response => {
        cohortNames = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return cohortNames;
  },
  async getAlias(alias: string){
    let aliases;
    await smsClient.get(`${aliasNameSort}/address/${alias}`)
    .then(response => {
      aliases = response.data;
    })
    .catch(err => {
      console.log(err);
    });
    return aliases;
    }
  }



