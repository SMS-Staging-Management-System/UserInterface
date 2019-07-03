import { ITotalWeeklyState } from ".";
import { TOTAL_WEEKLY_TYPES } from "../../actions/dashboardActions/total-weekly.actions";

const initialState: ITotalWeeklyState = {
  interviewList: [],
  totalScheduled: 0,
  totalNotified: 0,
  totalReviewed: 0
}

export const totalWeeklyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TOTAL_WEEKLY_TYPES.SET_INTERVIEW_LIST:
      return {
        ...state,
        interviewList: action.payload.interviewList,
        totalScheduled: action.payload.totalScheduled,
        totalNotified: action.payload.totalNotified,
        totalReviewed: action.payload.totalReviewed
      }

    default:
      return state
  }
}