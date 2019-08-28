import { IManageCohortsState } from '.'
import { manageCohortsTypes } from '../../actions/manage-cohorts/manage-cohorts.actions'

const initialState: IManageCohortsState = {
<<<<<<< HEAD
    cohorts: [],
    currentPage: 0,
    totalPages: 1
=======
   cohorts: [] 
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export const manageCohortsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (manageCohortsTypes.UPDATE_COHORTS):
<<<<<<< HEAD
            console.log(action.payload)
            return {
                ...state,
                cohorts: action.payload.cohorts,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
=======
            return {
                ...state,
                cohorts: action.payload.cohorts
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            }
    }
    return state;
}