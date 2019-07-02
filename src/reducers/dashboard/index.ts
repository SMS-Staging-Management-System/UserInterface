import { IUser } from "../../model/user.model";
import { byStagingReducer } from "./byStaging.reducer";
import { combineReducers } from "redux";

//global state of dashboard
export interface IDashboardState{
    byStagingUserList: IUser[]
}


//Asigning part of the global state to the right reducer 
export const dashboardState = combineReducers<IDashboardState>({
    byStagingUserList: byStagingReducer,
    
 })