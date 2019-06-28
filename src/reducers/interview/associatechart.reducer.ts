import { IAssociateChartState } from ".";
import { associateChartTypes } from "../../actions/assoc-24-chart/assoc24chart.actions"

const initialState : IAssociateChartState = {
    assocNoticeData: [0, 0]
}

export const associateChartReducer = (state = initialState, action : any): IAssociateChartState => {
    switch (action.type) {
        case associateChartTypes.SET_ASSOC_NOTICE_DATA:
            return {
                ...state,
                assocNoticeData: action.payload
            }
        default:
            return state
    }
}