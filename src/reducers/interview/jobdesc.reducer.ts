import { IJobDescriptionChartState } from ".";
import { jobDescriptionChartTypes } from "../../actions/jobDesc-chart/jobdescription.actions"

const initialState : IJobDescriptionChartState = {
    data: {
        datasets: [{
            data: [0,0],
            backgroundColor: [
                'rgba(200, 49, 255, 0.2)',
                'rgba(54, 162, 255, 0.2)',
            ],
            borderColor: [
                'rgba(200, 49, 255, 0.2)',
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

export const jobDescriptionChartReducer = (state = initialState, action : any): IJobDescriptionChartState => {
    switch (action.type) {
        case jobDescriptionChartTypes.GET_INFO:
            if (action.payload.chartInfo){
			
				let jd = 0;
				let njd = 0;
				console.log(action.payload.chartInfo);
				for (var i in action.payload.chartInfo)
				{
					if (action.payload.chartInfo[i].jd == true) jd++;
					if (action.payload.chartInfo[i].jd == false) njd++;
				}
                state.data.datasets[0].data[0] = jd;
                state.data.datasets[0].data[1] = njd;
            }
            return {
                ...state
            }
        case jobDescriptionChartTypes.SET_CANVAS:
            return {
                ...state,
                canvas: action.payload.canvas
            }
        default:
            return state
    }
}