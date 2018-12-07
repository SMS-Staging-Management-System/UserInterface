import { IUser } from "./User.model";

export interface ICohort {
  cohortId: number;
  name:     string;
  userList: IUser[];
}