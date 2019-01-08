import { smsClient } from ".";

const addressesContext = '/addresses'
const urls = {
  findByIsTrainingLocation: (isTrainingLocation: boolean) => addressesContext + `/is-training-location/${isTrainingLocation}`
}

export const addressesClient = {
  findByIsTrainingLocation(isTrainingLocation: boolean) {
    return smsClient.get(urls.findByIsTrainingLocation(isTrainingLocation));
  }
}