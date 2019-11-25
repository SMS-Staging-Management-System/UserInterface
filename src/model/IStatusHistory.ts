/** @prettier */
import { IUser } from './IUser';
import { IStatus } from './IStatus';
import { IAddress } from './IAddress';

export interface IStatusHistory {
  statusHistoryId: number;
  statusStart: Date;
  user: IUser;
  status: IStatus;
  address: IAddress;
}
