import { IAddress } from "./address.model";
import { ICohort } from "./cohort";

export interface ICreateUser {
  email:      string;
  firstName:  string;
  lastName:   string;
  phoneNumber:     string;
  trainingAddress:    IAddress;
  dropdownRole: string,
  cohort: ICohort,
  role: string,
}