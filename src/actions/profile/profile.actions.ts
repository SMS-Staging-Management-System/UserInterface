import { IUser } from "../../model/user.model";

export const profileTypes = {
    VIEW_PROFILE: 'VIEW_PROFILE',
}

export const viewProfile = (currentUser: IUser) => {
    return {
        payload: {
            user: currentUser
        },
        type: profileTypes.VIEW_PROFILE
    }
}