import { IReportFormState } from ".";
import { reportformTypes } from "../actions/report-form/reportformTypes.actions";

const initialState : IReportFormState = {
    //add the various things you'd like to display on your report here
}

export const reportFormReducer = (state = initialState, action : any): IReportFormState => {
    switch (action.type) {
        
        case reportformTypes.TYPE:
            return {
                ...state,
            }
        default:
            return state
    }
}