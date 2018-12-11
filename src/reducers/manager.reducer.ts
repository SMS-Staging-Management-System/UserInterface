import { managerTypes } from '../actions/manager/manager.actions';
import { IManagerState } from '.';
import { toast } from "react-toastify";

const initialState: IManagerState = {
  checkIns: [],
  cohorts:  [],
  currentCheckIns: [],
  currentCohort: null
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
    case managerTypes.FILTER_CHECK_IN_LIST:
      return {
        ...state,
        currentCheckIns: action.payload.currentCheckIns
      }
    case managerTypes.SELECT_COHORT:
      return {
        ...state,
        currentCohort: action.payload.currentCohort
      }
  }
  return state;
}