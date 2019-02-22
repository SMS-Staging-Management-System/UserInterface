import { smsClient } from ".";

const addressesContext = '/addresses'

export const addressesClient = {
  findByIsTrainingLocation(isTrainingLocation: boolean) {
    return smsClient.get(addressesContext + `/is-training-location/${isTrainingLocation}`);
  }
}