import { IUser } from "../../model/user.model";
import { byStagingReducer } from "./byStaging.reducer";
import { combineReducers } from "redux";
import { Interview } from "../../model/Interview.model";
import { totalWeeklyReducer } from "./total-weekly.reducer";

//global state of dashboard

export interface ITotalWeeklyState {
    interviewList: Interview[];
    totalScheduled: number;
    totalNotified: number;
    totalReviewed: number;
}

export interface IDashboardState{
    byStagingUserList: IUser[];
    totalWeekly: ITotalWeeklyState;
    droppedAssoc: IUser[];
}


//Asigning part of the global state to the right reducer 
export const dashboardState = combineReducers<IDashboardState>({
    byStagingUserList: byStagingReducer,
    totalWeekly: totalWeeklyReducer,
 })