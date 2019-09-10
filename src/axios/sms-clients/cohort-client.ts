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
  findByToken(token: string) {
    return smsClient.get(cohortContext + `/token/${token}`)
  },
  joinCohort(user:IUser, token:string){
    return smsClient.post(cohortContext + `/token/${token}`, user)
  },
  findAllByPage(page: number) {
    return smsClient.get(`${cohortContext}?page=${page}`)
  },

  findAllByAddressPage( addressId: number, page: number) {
    return smsClient.get(`${cohortContext}/address/id/${addressId}?page=${page}`)
  },

  findAllByTrainerPage(email: String, page: number) {
    return smsClient.get(cohortContext+`/trainer/${email}/email?page=${page}`)
  },

  findAll() { 
    return smsClient.get(cohortContext)
  },
  async getUsers(id: number) {
     const resp = await smsClient.get(`${cohortContext}/users/id/${id}`);
     const cohortUsers = resp.data;
    return cohortUsers;
  },
  async getName(cohortName: string){
    if(!cohortName){
      return [];
    }
    const resp = await smsClient.get(`${cohortNameSort}/${cohortName}`);
    const cohortNames = resp.data;
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
  },
  getEndingCohorts: async (date: number | Date) => {
      // Pass an epoch date number instead of a Date object, but accept
      // either one for convenience or to account for user error
      const epochDate = typeof date === 'number' ? date : date.getTime();
      return await smsClient.get(`${cohortContext}/prestaging/${epochDate}`);
  }
}
