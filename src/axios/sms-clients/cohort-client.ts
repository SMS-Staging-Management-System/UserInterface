import { smsClient } from ".";
import { ICohort } from "../../model/cohort";
import { IUser } from "../../model/user.model";

const cohortContext = '/user-service/cohorts'
<<<<<<< HEAD
const cohortNameSort = '/user-service/page';
const aliasNameSort = '/user-service/page';
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

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
<<<<<<< HEAD
  
  findAllByPage(page: number) {
    return smsClient.get(cohortContext+`/page/${page}`)
  },
  
  findAll() {
    return smsClient.get(cohortContext)
  },

  async getUsers(id: number) {
    let cohortUsers: IUser[] = [];
    await smsClient.get(`${cohortContext}/users/id/${id}`)
      .then(response => {
        cohortUsers = response.data;
      })
      .catch(err => {
        console.log(err);
      });
    return cohortUsers;
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
  },
    
  getEndingCohorts: async (date: number | Date) => {

      // Pass an epoch date number instead of a Date object, but accept
      // either one for convenience or to account for user error
      let epochDate = typeof date === 'number' ? date : date.getTime();

      return await smsClient.get(`${cohortContext}/prestaging/${epochDate}`);
  }
}



=======
  getAll: () => {
    return smsClient.get(cohortContext + "/cohorts");
  },

  findAll() {
    return smsClient.get(cohortContext)
  }
}
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
