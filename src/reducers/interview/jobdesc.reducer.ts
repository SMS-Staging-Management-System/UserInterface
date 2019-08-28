import { ISimpleChartDataState } from ".";
import { jobDescriptionChartTypes } from "../../actions/jobDesc-chart/jobdescription.actions"

const initialState : ISimpleChartDataState = {
    chartData: [0, 0]
}

export const jobDescriptionChartReducer = (state = initialState, action : any): ISimpleChartDataState => {
    switch (action.type) {
        case jobDescriptionChartTypes.SET_JD_CHART_INFO:
            return {
                ...state,
                chartData: action.payload
            }
        default:
            return state
    }
}