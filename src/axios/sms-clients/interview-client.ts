import { smsClient } from ".";
import { INewInterviewData } from "../../model/INewInterviewData";

const interviewContext = '/interview';


export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },
  
    addNewInterview: async (newInterview: INewInterviewData) => {
        console.log(newInterview);
        return await smsClient.post(interviewContext + '/new', newInterview);
    },
  
    getInterview: async (interviewId: number) => {
        return await smsClient.get(`${interviewContext}/${interviewId}`);
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

    assocNeedFeedbackChart: async () => {
        return await smsClient.get(interviewContext + `/reports/AssociateNeedFeedback/chart`);
    },

    interviewPerAssoc: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/InterviewsPerAssociate/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },
      
    sendFeedback: async (feedback: any) => {
        return await smsClient.post(interviewContext+`/feedback`, feedback);
    },

    fetchManager24: async () => {
        return await smsClient.get(interviewContext+`/reports/request24/manager`);
    },

    fetchAssoc24: async () => {
        return await smsClient.get(interviewContext+`/reports/request24/associate`);
    },

    fetch24: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/interview/reports/interview24/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJD: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/interview/reports/interviewJD/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJDChart: async () => {
        return await smsClient.get(interviewContext+`/interview/reports/interviewJD/`);
    },
    fetchClient: async () => {
        return await smsClient.get(interviewContext+`/client`);
    },

    submitAssocInput: async (payload: any) => {
        return await smsClient.post(interviewContext +'/associateInput', payload);
    }, 

    fetchInterviewFeedback: async (interviewId: number) => {
        return await smsClient.get(interviewContext+`/Feedback/InterviewId/${interviewId}`);        ;
    },

    markInterviewAsReviewed : (id : number) => {
        return smsClient.get(interviewContext + '/markReviewed/' + id);
    }
}