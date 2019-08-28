import { IAddress } from "./address.model";
import { IStatus } from "./status.model";
import { ICohort } from "./cohort";

export interface IUser {
  email:      string;
  userId:     number;
  firstName:  string;
  lastName:   string;
  phoneNumber:     string;
  trainingAddress:    IAddress;
  personalAddress:    IAddress;
  userStatus:     IStatus
  roles: string[];
  cohorts?: ICohort[];
}