import { IAveragedChartDataState } from ".";
import { interviewCountTypes } from "../../actions/interview-count/interviewcount.actions";

const initialState: IAveragedChartDataState = {
  totalNumber: 1,
  chartData: []
}

export const interviewsCountReducer = (state = initialState, action):IAveragedChartDataState => {
  switch (action.type) {
    case interviewCountTypes.SET_INTERVIEWCOUNT_CHARTDATA:
      return {
        totalNumber: action.payload.totalNumber,
        chartData: action.payload.countData,
      }
    default:
      return state
  }
}
