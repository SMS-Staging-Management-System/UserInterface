import { IAssociateChartState } from ".";
import { feedbackRequestedChartTypes } from "../../actions/feedbackReq-chart/feedbackrequested.actions"

const initialState : IAssociateChartState = {
    data: {
        datasets: [{
            data: [0,0],
            backgroundColor: [
                'rgba(190, 213, 3, 0.2)',
                'rgba(89, 243, 132, 0.2)',
            ],
            borderColor: [
                'rgba(190, 213, 3, 0.2)',
                'rgba(89, 243, 132, 0.2)',
            ],
        }],
        labels: [
            'Feedback',
            'No Feedback',
        ],
    },
    canvas: undefined,
}

export const feedbackRequestedChartReducer = (state = initialState, action : any): IAssociateChartState => {
    switch (action.type) {
        case feedbackRequestedChartTypes.GET_INFO:
            if (action.payload.chartInfo) {
                state.data.datasets[0].data[0] = action.payload.chartInfo[3];
                state.data.datasets[0].data[1] = action.payload.chartInfo[4];
            }
            return {
                ...state
            }
        case feedbackRequestedChartTypes.SET_CANVAS:
            return {
                ...state,
                canvas: action.payload.canvas
            }
        default:
            return state
    }
}