import { IUser } from "./user.model";
import { IAddress } from "./address.model";

export interface ICohort {
  cohortId:           number,
  cohortName:         string,
  cohortDescription:  string,
  cohortToken:        string,
  address:            IAddress,
  startDate:          string, // 2019-01-15
  endDate:            string, // yyyy-MM-dd
  users:              IUser[],
  trainer:            IUser
  
}