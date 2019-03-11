import { smsClient } from ".";
import { INewInterviewData } from "../../interview-src/model/INewInterviewData";

const interviewContext = '/interview';


export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },

    addNewInterview: async (newInterview: INewInterviewData) => {
        return await smsClient.post(interviewContext + '/new', newInterview);
    }
}