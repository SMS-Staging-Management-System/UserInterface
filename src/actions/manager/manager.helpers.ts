import * as cohortClient from '../../axiosClients/cohortClient/cohortClient';
import { ICohort } from '../../model/Cohort.model';
import { managerTypes } from './manager.actions';
import { IUser } from 'src/model/User.model';
import { ICheckIn } from 'src/model/CheckIn.model';

export const getManagerCohorts = () => dispatch => {
  cohortClient.getManagerCohorts()
    .then(response => {
      const cohortList = response.data.map(cohort => {
        return cohortClient.getUsersByCohortId(cohort.cohortId)
          .then(cohortResponse => {
            cohort.userList = cohortResponse.data.map(user => user as IUser);
            return cohort as ICohort;
          })
      })

      Promise.all(cohortList)
        .then(cohorts => {
          let currentCohort = null;
          if (cohortList.length !== 0) {
            currentCohort = cohorts[0];
          }
          dispatch({
            payload: {
              cohorts,
              currentCohort
            },
            type: managerTypes.SET_COHORT_LIST
          })
        })
    })
    .catch(error => {
      console.log(error);
    })
}

/**
 * sort a list of check ins by date
 * @param checkIns 
 * @param reverse 
 */
export const sortCheckInByDate = (checkIns: ICheckIn[], reverse?: boolean) => {
  const list = checkIns.sort((checkInA, checkInB) => {
    return checkInB.dateSubmitted - checkInA.dateSubmitted
  })

  if(reverse) {
    return list.reverse();
  } else {
    return list;
  }
}