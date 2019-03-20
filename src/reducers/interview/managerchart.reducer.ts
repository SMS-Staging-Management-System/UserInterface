import { IManagerChartState } from ".";
import { managerChartTypes } from "../../actions/manager-24-chart/manager24chart.actions"

const initialState : IManagerChartState = {
    data: {
        datasets: [{
            data: [0,0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 255, 1)',
            ],
        }],
        labels: [
            'Insufficient Notice',
            'Sufficient Notice',
        ],
    },
    canvas: undefined,
}

export const managerChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case managerChartTypes.GET_INFO:
            if (action.payload.chartInfo){
                state.data.datasets[0].data[0] = action.payload.chartInfo[0]-action.payload.chartInfo[1];
                state.data.datasets[0].data[1] = action.payload.chartInfo[1];
            }
            return {
                ...state
            }
        case managerChartTypes.SET_CANVAS:
            return {
                ...state,
                canvas: action.payload.canvas
            }
        default:
            return state
    }
}