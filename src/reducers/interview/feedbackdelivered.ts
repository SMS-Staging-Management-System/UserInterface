import { IManagerChartState } from ".";
import { feedbackDeliveredChartTypes } from "../../actions/feedbackDel-chart/feedbackdelivered.actions"
const initialState : IManagerChartState = {
    data: {
        datasets: [{
            data: [0,0],
                        // These labels appear in the legend and in the tooltips when hovering different arcs
     
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

export const feedbackDeliveredChartReducer = (state = initialState, action : any): IManagerChartState => {
    switch (action.type) {
        case feedbackDeliveredChartTypes.GET_INFO:

        //update the data according to api
        if (action.payload.chartInfo)
        {
        //people who weren't sufficiently notified
        state.data.datasets[0].data[0] = action.payload.chartInfo[1];
        //people who were sufficiently notified
        state.data.datasets[0].data[1] = action.payload.chartInfo[2];
        }


        console.log("Returned Chart Info " + action.payload.chartInfo);
            return {
                ...state
            }
		        case feedbackDeliveredChartTypes.SET_CANVAS:

			//set the canvas ref
            return {
                ...state,
				canvas: action.payload.canvas
            }
				
        default:
            return state
    }
}