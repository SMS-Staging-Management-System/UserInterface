import { IUser } from "./User.model";

export interface ICohort {
  cohortId: number;
  cohortName:     string;
  cohortDescription: string;
  userList: IUser[];
}