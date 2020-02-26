/** @prettier */
export interface ICognitoUser {
  firstName?: string;
  lastName?: string;
  email: string;
  roles: string[];
}

export const cognitoRoles = {
  ADMIN: 'admin',
  STAGING_MANAGER: 'staging-manager',
  TRAINER: 'trainer',
  ASSOCIATE: 'associate',
  CAP_ADMIN: 'Admin',
  CAP_STAGING_MANAGER: 'Staging-Manager',
  CAP_TRAINER: 'Trainer',
  CAP_ASSOCIATE: 'Associate'
  
};
