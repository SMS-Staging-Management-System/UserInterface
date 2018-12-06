import * as axiosClients from '../../axiosClients/axiosClient';
import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import * as cohortClient from '../../axiosClients/cohortClient/cohortClient';
import { CheckIn } from '../../model/CheckIn.model';
import { Cohort } from '../../model/Cohort.model';

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
      let checkInList = response.data.result.checkIns.map(checkIn => {
        return <CheckIn> checkIn;
      })
      dispatch({
        type: managerTypes.ADD_CHECK_INS,
        payload: {
          checkIns:  checkInList
        }
      });
    })
    .catch(error => {
    })
    cohortClient.getManagerCohorts()
    .then(response => {
      let cohortList = response.data.result.cohorts.map(cohort => {
        return <Cohort> cohort;
      })
      dispatch({
        type: managerTypes.ADD_COHORTS,
        payload: {
          cohorts:  cohortList
        }
      });
    })
    .catch(error => {
    })
  }
}

/**
 * Update a check in with a comment
 * @param comment 
 */
export const submitCheckInComment = (comment: string, checkInId: number) => {
  if(localStorage.getItem('REVATURE_SMS_COGNITO')) {
    let body = {
      "comments": comment
    }
    checkInClient.postManagerComment(body, checkInId)
    .then(response => {})
    .catch(error => {})
  }
}

/**
 * Set current render check ins by given user id
 * @param userId 
 * @param checkInList 
 */
export const filterCheckInByUserId = (userId: number, checkInList: Array<CheckIn>) => (dispatch) => {
  let filterList = checkInList.filter(checkIn => {
    return checkIn.userId === userId;
  })
  dispatch({
    type: managerTypes.FILTER_CHECK_IN_LIST,
    payload: {
      currentCheckIns: filterList
    }
  });
}

/**
 * Set the current list of render check ins from a Date to a Data
 * @param fromDate 
 * @param toDate 
 * @param checkInList 
 */
export const filterCheckInByDateRange = (fromDate: Date, toDate: Date, checkInList: Array<CheckIn>) => dispatch => {
  let filterList = checkInList.filter(checkIn => {
    let submitDate = new Date(checkIn.submitTime);
    return submitDate >= fromDate && submitDate <= toDate;
  })
  dispatch({
    type: managerTypes.FILTER_CHECK_IN_LIST,
    payload: {
      currentCheckIns: filterList
    }
  });
}

/**
 * Set the current list of render check ins to the check ins in a given cohort id
 * @param cohortId 
 * @param checkInList 
 * @param cohortList 
 */
export const filterCheckInByCohortId = (cohortId: number, checkInList: Array<CheckIn>, cohortList: Array<Cohort>) => dispatch => {
  let cohort = cohortList.find(cohort => {
    return cohort.cohortId === cohortId;
  })
  if(cohort === undefined) 
    return;
  let filterList;
  cohort.userList.forEach( user => {
    filterList = checkInList.filter( checkIn => {
      return checkIn.userId === user.userId;
    })
  })
  dispatch({
    type: managerTypes.FILTER_CHECK_IN_LIST,
    payload: {
      currentCheckIns: filterList
    }
  });
}