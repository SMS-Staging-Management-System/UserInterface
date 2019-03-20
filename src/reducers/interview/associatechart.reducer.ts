import { IAssociateChartState } from ".";
import { associateChartTypes } from "../../actions/assoc-24-chart/assoc24chart.actions";

const initialState : IAssociateChartState = {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [50, 20],
                        // These labels appear in the legend and in the tooltips when hovering different arcs
     
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
    chartInfo:[6,4]
}

export const associateChartReducer = (state = initialState, action : any): IAssociateChartState => {
    switch (action.type) {
        case associateChartTypes.GET_INFO:
        return {
            ...state,
            chartInfo: action.payload.chartInfo,
        }
        default:
            return state
    }
}