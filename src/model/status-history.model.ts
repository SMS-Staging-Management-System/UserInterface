import { IUser } from "./user.model";
import { IStatus } from "./status.model";
import { IAddress } from "./address.model";

export interface IStatusHistory {
    statusHistoryId:    number;
    statusStart:        Date;
    user:               IUser;
    status:             IStatus;
    address:            IAddress;
}