import { IManageCohortsState } from '.'
import { manageCohortsTypes } from '../../actions/manage-cohorts/manage-cohorts.actions'

const initialState: IManageCohortsState = {
   cohorts: [] 
}

export const manageCohortsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (manageCohortsTypes.UPDATE_COHORTS):
            return {
                ...state,
                cohorts: action.payload.cohorts
            }
    }
    return state;
}