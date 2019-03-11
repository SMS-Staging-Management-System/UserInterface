import { IManageCohortsState } from '.'
import { manageCohortsTypes } from '../../actions/manage-cohorts/manage-cohorts.actions'
import { toast } from 'react-toastify';

const initialState: IManageCohortsState = {
   cohorts: [] 
}

export const manageCohortsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (manageCohortsTypes.UPDATE_COHORTS):
            toast.info('Updating cohorts state')
            return {
                ...state,
                cohorts: action.payload.cohorts
            }
    }
    return state;
}