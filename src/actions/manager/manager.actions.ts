import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import * as cohortClient from '../../axiosClients/cohortClient/cohortClient';
import { toast } from "react-toastify";
import { ICheckIn } from '../../model/CheckIn.model';
import { ICohort } from '../../model/Cohort.model';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';

export const managerTypes = {
  ADD_CHECK_INS:    'ADD_CHECK_INS',
  ADD_COHORTS:      'ADD_COHORTS',
  FILTER_CHECK_IN_LIST: 'FILTER_CHECK_IN_LIST',
  SELECT_COHORT:    'SELECT_COHORT',
  SET_SHOW_COHORT:  'SET_SHOW_COHORT'
}

/**
 * Set up manager list of classes and check-ins
 */
export const managerInit = () => (dispatch) => {
  checkInClient.getManagerCheckInToday()
  .then(response => {
    const checkInList = response.data.result.map(checkIn => {
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
    const cohortList = response.data.result.map(cohort => {
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

/**
 * Manager post a new cohort
 * @param cohortName 
 * @param emailList 
 */
export const postCohort = (cohortName: string, cohortDescription: string, users: IUserCreateDto[]) => dispatch => {
  cohortClient.postCohort(cohortName, cohortDescription, users)
  .then(response => {
    toast.success("Cohort created")
  })
  .catch(error => {
    toast.success("Unable to create cohort or some users")
  })
}

/**
 * Update a check in with a comment
 * @param comment 
 */
export const submitCheckInComment = (comment: string, checkInId: number) => {
  const body = {
    "comments": comment
  }
  checkInClient.postManagerComment(body, checkInId)
  .then(response => {
    toast.success("Comment submitted")
  })
  .catch(error => {
    console.log("error");
  })
}

/**
 * Set the current list of render check ins
 * @param fromDate 
 * @param ?toDate 
 * @param ?checkInList 
 */
export const getCheckIn = (fromDate: Date, toDate: Date) => dispatch => {
  checkInClient.getCheckIn(fromDate, toDate)
  .then(response => {
    const checkinList = response.data.result.map(checkin => {
      return checkin as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkinList
      },
      type: managerTypes.FILTER_CHECK_IN_LIST
    });
  })
  .catch(error => {
    console.log("error");
  })
}

/**
 * Set current render check ins by given user id
 * @param userId 
 * @param fromDate 
 * @param toDate 
 */
export const getCheckInByUserId = (userId: number, fromDate: Date, toDate: Date) => (dispatch) => {
  checkInClient.getCheckInByUserId(userId, fromDate, toDate)
  .then(response => {
    const checkinList = response.data.result.map(checkin => {
      return checkin as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkinList
      },
      type: managerTypes.FILTER_CHECK_IN_LIST
    });
  })
  .catch(error => {
    console.log("error");
  })
}

/**
 * Set the current list of render check ins to the check ins in a given cohort id
 * @param cohortId 
 * @param checkInList 
 * @param cohortList 
 */
export const getCheckInByCohortId = ( cohortId:     number,
                                      fromDate:     Date, 
                                      toDate:       Date
                                      ) => dispatch => {

  checkInClient.getCheckInByCohortId(cohortId, fromDate, toDate)
  .then(response => {
    const checkinList = response.data.result.map(checkin => {
      return checkin as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkinList
      },
      type: managerTypes.FILTER_CHECK_IN_LIST
    });
  })
  .catch(error => {
    console.log("error");
  })
}

/**
 * Set the current select cohort to be render
 * @param sCohort 
 */
export const selectCohort = (sCohort: ICohort) => dispatch => {
  setTimeout(() => {
    dispatch({
      payload: {
        currentCohort: sCohort
      },
      type: managerTypes.SELECT_COHORT
    });
  }, 500);
  dispatch({
    payload: {
      isShowCohort: false
    },
    type: managerTypes.SET_SHOW_COHORT
  });
  setTimeout(() => {
    dispatch({
      payload: {
        isShowCohort: true
      },
      type: managerTypes.SET_SHOW_COHORT
    });
  }, 700);
}