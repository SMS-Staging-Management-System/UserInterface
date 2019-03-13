import { addressesClient } from "../../axios/sms-clients/address-client";

export const addressTypes = {
  UPDATE_TRAINING_ADDRESSES: 'UPDATE_TRAINING_ADDRESSES'
}

export const updateLocations = () => (dispatch) => {
  addressesClient.findByIsTrainingLocation(true)
    .then(resp => {
      dispatch({
        payload: {
          addresses: resp.data
        },
        type: addressTypes.UPDATE_TRAINING_ADDRESSES
      })
    })
}