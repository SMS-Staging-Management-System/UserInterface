import { ICreateInterviewComponentState } from "../../reducers/interview";


export const createInterviewTypes = {
  SET_CREATE_INTERVIEW_COMPONENT_STATE: 'SET_CREATE_INTERVIEW_COMPONENT_STATE'
}

export const setState = (newCreateInterviewComponentState: ICreateInterviewComponentState) => (dispatch) => {    
    dispatch({
        type: createInterviewTypes.SET_CREATE_INTERVIEW_COMPONENT_STATE,
        payload:  newCreateInterviewComponentState
    });
}