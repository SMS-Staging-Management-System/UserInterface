import { IToStagingState } from ".";
import { TO_STAGING_TYPES } from "../../actions/dashboardActions/to-staging.actions";

const initialState: IToStagingState = {
  cohortList: []
}

export const toStagingReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case TO_STAGING_TYPES.SET_COHORT_LIST:
      return {
        ...state,
        cohortList: action.payload
      }

    default:
      return state
  }
} 