import { IUser } from "../../model/user.model";

export const profileTypes = {
    VIEW_PROFILE: 'VIEW_PROFILE',
}

export const viewProfile = (user: IUser) => {
    return {
        payload: {
            user: user
        },
        type: profileTypes.VIEW_PROFILE
    }
}