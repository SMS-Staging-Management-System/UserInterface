import { IManagerChartState } from ".";
import { feedbackDeliveredChartTypes } from "../../actions/feedbackDel-chart/feedbackdelivered.actions"

const initialState : IManagerChartState = {
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
    options: {
        legend: {
            labels: {
                defaultFontSize: 18,
                fontSize: 18
            }
        },
        pointLabels: {
            fontSize: 18
        }
    },
    canvas: undefined,
}

export const feedbackDeliveredChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case feedbackDeliveredChartTypes.GET_INFO:
            if (action.payload.chartInfo) {
                state.data.datasets[0].data[0] = action.payload.chartInfo[1];
                state.data.datasets[0].data[1] = action.payload.chartInfo[2];
            }
            return {
                ...state
            }
        case feedbackDeliveredChartTypes.SET_CANVAS:
            return {
                ...state,
                canvas: action.payload.canvas
            }
        default:
            return state
    }
}