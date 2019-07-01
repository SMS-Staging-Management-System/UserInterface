import { ISimpleChartDataState } from ".";
import { managerChartTypes } from "../../actions/manager-24-chart/manager24chart.actions"

const initialState : ISimpleChartDataState = {
    chartData: [0, 0]
}

export const managerChartReducer = (state = initialState, action : any): ISimpleChartDataState => {
    switch (action.type) {
        case managerChartTypes.SET_MANAGER_NOTICE_DATA:
            return {
                ...state,
                chartData: action.payload
            }
        default:
            return state
    }
}