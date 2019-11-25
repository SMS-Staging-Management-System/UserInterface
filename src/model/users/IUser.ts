/** @prettier */
import { IAddress } from './IAddress';
import { IStatus } from './IStatus';
import { ICohort } from './ICohort';

export interface IUser {
  email: string;
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  trainingAddress: IAddress;
  personalAddress: IAddress;
  userStatus: IStatus;
  roles: string[];
  cohorts?: ICohort[];
}
