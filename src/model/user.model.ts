import { IAddress } from "./address.model";

export interface IUser {
  email:      string;
  userId:     number;
  firstName:  string;
  lastName:   string;
  phoneNumber:     string;
  address:    IAddress;
  roles: string[];
}