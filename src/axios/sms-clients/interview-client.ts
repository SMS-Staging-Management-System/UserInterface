import { smsClient } from ".";

const interviewContext = '/interview';


export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },
    interviewPerAssoc: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/reports/InterviewsPerAssociate/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    }
}