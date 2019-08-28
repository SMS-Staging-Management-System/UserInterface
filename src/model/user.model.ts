import { IAddress } from "./address.model";
import { IStatus } from "./status.model";
<<<<<<< HEAD
import { ICohort } from "./cohort";
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

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
<<<<<<< HEAD
  cohorts?: ICohort[];
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}