import * as checkInClient from '../../axiosClients/checkInClient/checkInClient';
import * as cohortClient from '../../axiosClients/cohortClient/cohortClient';
import { toast } from "react-toastify";
import { ICheckIn } from '../../model/CheckIn.model';
import { ICohort } from '../../model/Cohort.model';
import { IUserCreateDto } from 'src/model/UserCreateDto.model';
import { IUser } from 'src/model/User.model';

export const managerTypes = {
  ADD_CHECK_INS:    'ADD_CHECK_INS',
  ADD_COHORT:       'ADD_COHORT',
  SELECT_COHORT:    'SELECT_COHORT',
  SET_CHECK_IN_COMMENT: "SET_CHECK_IN_COMMENT",
  SET_CHECK_IN_LIST:  'SET_CHECK_IN_LIST',
  SET_COHORT_LIST:    'SET_COHORT_LIST',
  SET_SHOW_COHORT:  'SET_SHOW_COHORT',
}

/**
 * Set up manager list of classes and check-ins
 */
export const managerInit = () => (dispatch) => {
  checkInClient.getManagerCheckInToday()
  .then(response => {
    console.log(response)
    const checkInList = response.data.map(checkIn => {
      return checkIn as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkInList
      },
      type: managerTypes.SET_CHECK_IN_LIST
    });
  })
  .catch(error => {
    console.log(error);
  })

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
      if(cohortList.length !== 0) {
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
 * Update a check in with a comment
 * @param comment 
 */
export const managerPostComment = (comment: string, checkInId: number) => {
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
export const getAllCheckIn = (fromDate: number, toDate: number) => dispatch => {
  checkInClient.getAllCheckIn(fromDate, toDate)
  .then(response => {
    const checkinList = response.data.result.map(checkin => {
      return checkin as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkinList
      },
      type: managerTypes.SET_CHECK_IN_LIST
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
export const getCheckInByUserId = (userId: number, fromDate: number, toDate: number) => (dispatch) => {
  checkInClient.getCheckInByUserId(userId, fromDate, toDate)
  .then(response => {
    const checkinList = response.data.result.map(checkin => {
      return checkin as ICheckIn;
    })
    dispatch({
      payload: {
        checkIns:  checkinList
      },
      type: managerTypes.SET_CHECK_IN_LIST
    });
  })
  .catch(error => {
    console.log(error);
  })
}

/**
 * Set the current list of render check ins to the check ins in a given cohort id
 * @param cohortId 
 * @param checkInList 
 * @param cohortList 
 */
export const getCheckInByCohortId = ( cohortId:     number,
                                      fromDate:     number, 
                                      toDate:       number
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
      type: managerTypes.SET_CHECK_IN_LIST
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
  }, 50);
}

/**
 * Get a list of check ins to be render base on criterias
 * @param cohortId 
 * @param userId 
 * @param fromDate 
 * @param toDate 
 */
export const managerGetCheckIns = (cohortId: number, userId: number, fromDate: number, toDate:   number) => dispatch => {
  if(userId === 0) {
    if(cohortId === 0) {
      getAllCheckIn(fromDate, toDate)(dispatch);
    } else {
      getCheckInByCohortId(cohortId, fromDate, toDate)(dispatch);
    }
  }
}

/**
 * Create a new cohort
 * @param cohortName 
 * @param cohortDescription 
 * @param userLists 
 */
export const managerPostCohort = (cohortName: string, cohortDescription: string, userList: IUserCreateDto[]) => dispatch => {
  cohortClient.postCohort(cohortName, cohortDescription, userList)
  .then(response => {
    const cohort = response.data as ICohort;
    cohortClient.getUsersByCohortId(cohort.cohortId)
    .then(cohortResponse => {
      cohort.userList = cohortResponse.data.map(user => user as IUser);
      dispatch({
        payload: {
          cohort
        },
        type: managerTypes.ADD_COHORT
      });
    })
  })
}