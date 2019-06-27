import { ITotalWeeklyState } from ".";
import { TOTAL_WEEKLY_TYPES } from "../../actions/total-weekly/total-weekly.actions";

const initialState: ITotalWeeklyState = {
  interviewList: []
}

export const totalWeeklyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOTAL_WEEKLY_TYPES.SET_INTERVIEW_LIST:
      return {
        ...state,
        interviewList: action.payload
      }

    default:
      return state
  }
}