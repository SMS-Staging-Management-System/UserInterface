<<<<<<< HEAD
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
=======
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            }
        default:
            return state
    }
}