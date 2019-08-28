import { ISimpleChartDataState } from ".";
import { feedbackRequestedChartTypes } from "../../actions/feedbackReq-chart/feedbackrequested.actions"

const initialState : ISimpleChartDataState = {
    chartData: []
}

export const feedbackRequestedChartReducer = (state = initialState, action : any): ISimpleChartDataState => {
    switch (action.type) {
        case feedbackRequestedChartTypes.SET_ASSOC_FEEDBACK_CHART_INFO:
            return {
                ...state,
                chartData: action.payload
            }
        default:
            return state
    }
}