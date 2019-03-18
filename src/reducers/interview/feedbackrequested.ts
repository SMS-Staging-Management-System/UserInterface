import { IAssociateChartState } from ".";
import { feedbackRequestedChartTypes } from "../../actions/feedbackReq-chart/feedbackrequested.actions"

const initialState : IAssociateChartState = {
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

export const feedbackRequestedChartReducer = (state = initialState, action : any): IAssociateChartState => {
    switch (action.type) {
        case feedbackRequestedChartTypes.GET_INFO:

        //update the data according to api
        if (action.payload.chartInfo)
        {
        //people who weren't sufficiently notified
        state.data.datasets[0].data[0] = action.payload.chartInfo[3];
        //people who were sufficiently notified
        state.data.datasets[0].data[1] = action.payload.chartInfo[4];

			if (action.payload.canvas)
			action.payload.canvas.update();
        }

		
        console.log("Returned Chart Info " + action.payload.chartInfo);
            return {
                ...state
            }
        case feedbackRequestedChartTypes.SET_CANVAS:

			//set the canvas ref
            return {
                ...state,
				canvas: action.payload.canvas
            }
			
        default:
            return state
    }
}