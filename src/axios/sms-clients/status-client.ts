import { smsClient } from ".";

const statusContext = '/status'

export const statusClient = {
  findAllStatuses() {
    return smsClient.get(statusContext );
  }
}