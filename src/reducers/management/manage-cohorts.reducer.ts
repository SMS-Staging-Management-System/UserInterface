import { IManageCohortsState } from '.'
import { manageCohortsTypes } from '../../actions/manage-cohorts/manage-cohorts.actions'

const initialState: IManageCohortsState = {
    cohorts: [],
    currentPage: 0,
    totalPages: 1
}

export const manageCohortsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (manageCohortsTypes.UPDATE_COHORTS):
            console.log(action.payload)
            return {
                ...state,
                cohorts: action.payload.cohorts,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages
            }
    }
    return state;
}