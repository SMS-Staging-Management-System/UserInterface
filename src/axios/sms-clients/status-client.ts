import { smsClient } from ".";

const statusContext = '/user-service/status'

export const statusClient = {
  findAllStatuses() {
    return smsClient.get(statusContext );
  }
}