import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import * as cohortClient from '../../axiosClients/cohortClient/cohortClient';
import { ICheckIn } from '../../model/CheckIn.model';
import { ICohort } from '../../model/Cohort.model';

export const managerTypes = {
  ADD_CHECK_INS:  'ADD_CHECK_INS',
  ADD_COHORTS:    'ADD_COHORTS',
  FILTER_CHECK_IN_LIST: 'FILTER_CHECK_IN_LIST'
}

/**
 * Set up manager list of classes and check-ins
 */
export const managerInit = () => (dispatch) => {
  if(axiosClients.addCognitoToHeader()) {
    checkInClient.getManagerCheckInToday()
    .then(response => {
      const checkInList = response.data.result.checkIns.map(checkIn => {
        return checkIn as ICheckIn;
      })
      dispatch({
        payload: {
          checkIns:  checkInList
        },
        type: managerTypes.ADD_CHECK_INS
      });
    })
    .catch(error => {
      console.log("error");
    })
    cohortClient.getManagerCohorts()
    .then(response => {
      const cohortList = response.data.result.cohorts.map(cohort => {
        return cohort as ICohort;
      })
      dispatch({
        payload: {
          cohorts:  cohortList
        },
        type: managerTypes.ADD_COHORTS
      });
    })
    .catch(error => {
      console.log("error");
    })
  }
}

/**
 * Update a check in with a comment
 * @param comment 
 */
export const submitCheckInComment = (comment: string, checkInId: number) => {
  if(localStorage.getItem('REVATURE_SMS_COGNITO')) {
    const body = {
      "comments": comment
    }
    checkInClient.postManagerComment(body, checkInId)
    .then(response => {
      console.log("error");
    })
    .catch(error => {
      console.log("error");
    })
  }
}

/**
 * Set current render check ins by given user id
 * @param userId 
 * @param checkInList 
 */
export const filterCheckInByUserId = (userId: number, checkInList: ICheckIn[]) => (dispatch) => {
  const filterList = checkInList.filter(checkIn => {
    return checkIn.userId === userId;
  })
  dispatch({
    payload: {
      currentCheckIns: filterList
    },
    type: managerTypes.FILTER_CHECK_IN_LIST
  });
}

/**
 * Set the current list of render check ins from a Date to a Data
 * @param fromDate 
 * @param toDate 
 * @param checkInList 
 */
export const filterCheckInByDateRange = (fromDate: Date, toDate: Date, checkInList: ICheckIn[]) => dispatch => {
  const filterList = checkInList.filter(checkIn => {
    const submitDate = new Date(checkIn.submitTime);
    return submitDate >= fromDate && submitDate <= toDate;
  })
  dispatch({
    payload: {
      currentCheckIns: filterList
    },
    type: managerTypes.FILTER_CHECK_IN_LIST
  });
}

/**
 * Set the current list of render check ins to the check ins in a given cohort id
 * @param cohortId 
 * @param checkInList 
 * @param cohortList 
 */
export const filterCheckInByCohortId = (cohortId: number, checkInList: ICheckIn[], cohortList: ICohort[]) => dispatch => {
  const cohorts = cohortList.find(cohort => {
    return cohort.cohortId === cohortId;
  })
  if(cohorts === undefined) {
    return;
  }

  let filterList;
  cohorts.userList.forEach( user => {
    filterList = checkInList.filter( checkIn => {
      return checkIn.userId === user.userId;
    })
  })
  dispatch({
    payload: {
      currentCheckIns: filterList
    },
    type: managerTypes.FILTER_CHECK_IN_LIST
  });
}