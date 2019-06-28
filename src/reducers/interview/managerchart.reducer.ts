import { IManagerChartState } from ".";
import { managerChartTypes } from "../../actions/manager-24-chart/manager24chart.actions"

const initialState : IManagerChartState = {
    managerNoticeData: [0, 0]
}

export const managerChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case managerChartTypes.SET_MANAGER_NOTICE_DATA:
            return {
                ...state,
                managerNoticeData: action.payload
            }
        default:
            return state
    }
}