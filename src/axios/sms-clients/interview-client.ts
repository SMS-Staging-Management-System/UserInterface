import { INewInterviewData } from "../../model/INewInterviewData";
import { interviewContext } from ".";



export const interviewClient = {
    testfetch: async () => {
        return await interviewContext.get('');
    },
  
    addNewInterview: async (newInterview: INewInterviewData) => {
        return await interviewContext.post('' + '/new', newInterview);
    },
    
    fetchPage: (pageNumber? : number, pageSize? : number, orderBy = 'id', direction='ASC') => {
        let url = '';
        url += '/page?orderBy=' + orderBy + '&direction=' + direction;
        if (pageNumber) {
            url+='&pageNumber=' + pageNumber;
        }
        if (pageSize) {
            url += '&pageSize=' + pageSize;
        }
        return interviewContext.get(url);
    },
      
    assocNeedFeedback: async (pageNumber:number, PageSize:number) => {
        return await interviewContext.get(''+`/reports/AssociateNeedFeedback/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },
      
    interviewPerAssoc: async (pageNumber:number, PageSize:number) => {
        return await interviewContext.get(''+`/reports/InterviewsPerAssociate/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },
      
    sendFeedback: async (feedback: any) => {
        return await interviewContext.post(''+`/feedback`, feedback);
    },

    fetchManager24: async () => {
        return await interviewContext.get(interviewContext+`/reports/request24/manager`);
    },

    fetchAssoc24: async () => {
        return await interviewContext.get(interviewContext+`/reports/request24/associate`);
    },
}