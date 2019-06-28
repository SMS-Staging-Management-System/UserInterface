import { IJobDescriptionChartState } from ".";
import { jobDescriptionChartTypes } from "../../actions/jobDesc-chart/jobdescription.actions"

const initialState : IJobDescriptionChartState = {
    JDdata: [0, 0]
}

export const jobDescriptionChartReducer = (state = initialState, action : any): IJobDescriptionChartState => {
    switch (action.type) {
        case jobDescriptionChartTypes.SET_JD_CHART_INFO:
            return {
                ...state,
                JDdata: action.payload
            }
        default:
            return state
    }
}