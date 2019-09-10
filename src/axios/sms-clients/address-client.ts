import { smsClient } from ".";

const addressesContext = '/user-service/addresses'

export const addressesClient = {
  findByIsTrainingLocation(isTrainingLocation: boolean) {
    return smsClient.get(addressesContext + `/is-training-location/${isTrainingLocation}`);
  }
,
  findAll(){
    return smsClient.get(addressesContext);
  }
}