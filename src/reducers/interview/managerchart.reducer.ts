<<<<<<< HEAD
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
=======
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            }
        default:
            return state
    }
}