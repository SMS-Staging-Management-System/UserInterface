import { IAddress } from "../../model/address.model";

export const profileTypes = {
    UPDATE_USER_TRAINING_LOCATION: 'UPDATE_USER_TRAINING_LOCATION'
}

export const updateUserTrainingLocation = (location: IAddress) => {
    return {
        payload: {
            location
        },
        type: profileTypes.UPDATE_USER_TRAINING_LOCATION
    }
}

