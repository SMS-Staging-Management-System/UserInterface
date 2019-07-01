import { ISimpleChartDataState } from ".";
import { associateChartTypes } from "../../actions/assoc-24-chart/assoc24chart.actions"

const initialState : ISimpleChartDataState = {
    chartData: [0, 0]
}

export const associateChartReducer = (state = initialState, action : any): ISimpleChartDataState => {
    switch (action.type) {
        case associateChartTypes.SET_ASSOC_NOTICE_DATA:
            return {
                ...state,
                chartData: action.payload
            }
        default:
            return state
    }
}