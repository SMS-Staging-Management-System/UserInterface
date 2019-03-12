import { smsClient } from ".";
import { INewInterviewData } from "../../interview-src/model/INewInterviewData";

const interviewContext = '/interview';


export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },
  
    addNewInterview: async (newInterview: INewInterviewData) => {
        return await smsClient.post(interviewContext + '/new', newInterview);
    },
    
    fetchPage: (pageNumber? : number, pageSize? : number, orderBy = 'id', direction='ASC') => {
        let url = interviewContext;
        url += '/page?orderBy=' + orderBy + '&direction=' + direction;
        if (pageNumber) {
            url+='&pageNumber=' + pageNumber;
        }
        if (pageSize) {
            url += '&pageSize=' + pageSize;
        }
        return smsClient.get(url);
    },
      
    assocNeedFeedback: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/reports/AssociateNeedFeedback/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },
      
    interviewPerAssoc: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/reports/InterviewsPerAssociate/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    fetchManager24: async () => {
        return await smsClient.get(interviewContext+`/reports/request24/manager`);
    },

    fetchAssoc24: async () => {
        return await smsClient.get(interviewContext+`/reports/request24/associate`);
    },
}