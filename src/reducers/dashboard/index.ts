import { IUser } from "../../model/IUser";
import { byStagingReducer } from "./byStaging.reducer";
import { combineReducers } from "redux";
import { Interview } from "../../model/Interview.model";
import { totalWeeklyReducer } from "./total-weekly.reducer";
import { ICohort } from "../../model/ICohort";
import { toStagingReducer } from "./to-staging.reducer";

//global state of dashboard

export interface ITotalWeeklyState {
    interviewList: Interview[];
    totalScheduled: number;
    totalNotified: number;
    totalReviewed: number;
}

export interface IToStagingState {
    cohortList: ICohort[];
}

export interface IDashboardState{
    byStagingUserList: IUser[];
    totalWeekly: ITotalWeeklyState;
    toStaging: IToStagingState;
}


//Asigning part of the global state to the right reducer 
export const dashboardState = combineReducers<IDashboardState>({
    byStagingUserList: byStagingReducer,
    totalWeekly: totalWeeklyReducer,
    toStaging: toStagingReducer
 })