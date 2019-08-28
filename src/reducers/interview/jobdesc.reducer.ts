<<<<<<< HEAD
import { ISimpleChartDataState } from ".";
import { jobDescriptionChartTypes } from "../../actions/jobDesc-chart/jobdescription.actions"

const initialState : ISimpleChartDataState = {
    chartData: [0, 0]
}

export const jobDescriptionChartReducer = (state = initialState, action : any): ISimpleChartDataState => {
    switch (action.type) {
        case jobDescriptionChartTypes.SET_JD_CHART_INFO:
            return {
                ...state,
                chartData: action.payload
=======
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            }
        default:
            return state
    }
}