import { managerTypes } from '../actions/manager/manager.actions';
import { IManagerState } from '.';
import { toast } from "react-toastify";

const initialState: IManagerState = {
  associates: [],
  checkIns:   [],
  cohorts:    [],
  currentCohort:  null,
  isShowCohort:   false
}

export const managerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case managerTypes.ADD_CHECK_INS:
      let checkIns = state.checkIns;
      checkIns += action.payload.checkIns;
      return {
        ...state,
        checkIns
      }
    case managerTypes.ADD_COHORTS:
      let cohorts = state.cohorts;
      cohorts += action.payload.cohorts;
      toast.success("Cohort added");
      return {
        ...state,
        cohorts
      }
    case managerTypes.SET_CHECK_IN_LIST:
      return {
        ...state,
        checkIns: action.payload.checkIns
      }
    case managerTypes.SET_COHORT_LIST:
      return {
        ...state,
        cohorts: action.payload.cohorts
      }
    case managerTypes.SELECT_COHORT:
      return {
        ...state,
        cohorts: action.payload.cohorts
      }
    case managerTypes.SET_SHOW_COHORT:
      return {
        ...state,
        isShowCohort: action.payload.isShowCohort
      }
  }
  return state;
}