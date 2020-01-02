import { IUser } from "../../model/users/IUser";
import { byStagingReducer } from "./byStaging.reducer";
import { combineReducers } from "redux";
import { IInterview } from "../../model/IInterview";
import { totalWeeklyReducer } from "./total-weekly.reducer";
import { ICohort } from "../../model/users/ICohort";
import { toStagingReducer } from "./to-staging.reducer";

//global state of dashboard

export interface ITotalWeeklyState {
    interviewList: IInterview[];
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