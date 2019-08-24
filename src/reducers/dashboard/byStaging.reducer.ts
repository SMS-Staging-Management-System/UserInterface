import * as types from './../../actions/dashboardActions/all.dashboard.actions'
import { IUser } from '../../model/user.model';

const initalState:IUser[] = [];

export const byStagingReducer = (state:IUser[] = initalState, action: any) => {
    let newState:IUser[] = [];
    switch(action.type) {
        case types.SET_STAGING_USER_LIST:
            newState = action.payload
            console.log('inside reducer::', action)
            return [...newState];
    }
    return [...state];
};