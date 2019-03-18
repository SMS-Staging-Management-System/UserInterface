import { IManagerChartState } from ".";
import { managerChartTypes } from "../../actions/manager-24-chart/manager24chart.actions"
const initialState : IManagerChartState = {
    data: {
        datasets: [{
            data: [0,0],
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
	canvas: undefined,
	
}

export const managerChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case managerChartTypes.GET_INFO:

        //update the data according to api
        if (action.payload.chartInfo)
        {
        //people who weren't sufficiently notified
        state.data.datasets[0].data[0] = action.payload.chartInfo[0]-action.payload.chartInfo[1];
        //people who were sufficiently notified
        state.data.datasets[0].data[1] = action.payload.chartInfo[1];
        }


        console.log("Returned Chart Info " + action.payload.chartInfo);
            return {
                ...state
            }
		        case managerChartTypes.SET_CANVAS:

			//set the canvas ref
            return {
                ...state,
				canvas: action.payload.canvas
            }
				
        default:
            return state
    }
}