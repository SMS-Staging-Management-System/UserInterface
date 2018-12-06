import { User } from "./User.model";

export interface Cohort {
  cohortId: number;
  name:     string;
  userList: Array<User>;
}