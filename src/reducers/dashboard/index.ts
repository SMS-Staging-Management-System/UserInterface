import { IUser } from "../../model/user.model";
import { byStagingReducer } from "./byStaging.reducer";
import { combineReducers } from "redux";
import { Interview } from "../../model/Interview.model";
import { totalWeeklyReducer } from "./total-weekly.reducer";
import { ICohort } from "../../model/cohort";
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
<<<<<<< HEAD
    droppedAssoc: IUser[];
=======
    toStaging: IToStagingState;
>>>>>>> 473826ae98f0f2d52896809b69803c3099e2d7f9
}


//Asigning part of the global state to the right reducer 
export const dashboardState = combineReducers<IDashboardState>({
    byStagingUserList: byStagingReducer,
    totalWeekly: totalWeeklyReducer,
<<<<<<< HEAD
=======
    toStaging: toStagingReducer
>>>>>>> 473826ae98f0f2d52896809b69803c3099e2d7f9
 })