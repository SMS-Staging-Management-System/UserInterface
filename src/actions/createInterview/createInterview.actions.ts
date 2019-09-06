import { ICreateInterviewComponentState } from "../../reducers/interview";
import { interviewClient } from "../../axios/sms-clients/interview-client";
import { Client } from "../../model/Client.model";


export const createInterviewTypes = {
  SET_CREATE_INTERVIEW_COMPONENT_STATE: 'SET_CREATE_INTERVIEW_COMPONENT_STATE',
  GET_ALL_CLIENTS: 'GET_ALL_CLIENTS'
}

export const setCreateState = (newCreateInterviewComponentState: ICreateInterviewComponentState) => (dispatch) => {
  dispatch({
    type: createInterviewTypes.SET_CREATE_INTERVIEW_COMPONENT_STATE,
    payload: newCreateInterviewComponentState
  });
}

export const  getAllClients = async () => {
  let tempArr = await interviewClient.fetchClient();
  let clientArr: Client[] = await tempArr.data;
      return {
        payload: {
          clientArr: clientArr
        },
        type: createInterviewTypes.GET_ALL_CLIENTS
      }
}