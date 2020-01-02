/** @prettier */
import { IAddress } from './IAddress';
import { ICohort } from './ICohort';

export interface ICreateUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  trainingAddress: IAddress;
  dropdownRole: string;
  cohort: ICohort;
  role: string;
}
