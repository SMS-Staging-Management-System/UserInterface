export interface ICognitoUser {
    firstName?: string;
    lastName?: string;
    email: string;
    roles: string[];
}

export const cognitoRoles = {
    ADMIN:'admin',
    STAGING_MANAGER:'staging-manager',
    TRAINER:'trainer',
    CAM_ADMIN:'Admin',
    CAM_STAGING_MANAGER:'Staging Manager',
    CAM_TRAINER:'Trainer',
}
