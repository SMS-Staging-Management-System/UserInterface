import { INewInterviewData } from "../../model/INewInterviewData";
import { store } from "../../Store";
import { smsClient } from ".";
import { cognitoRoles } from "../../model/cognito-user.model";

const interviewContext = '/interview-service/interview';

export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },

    addNewInterview: async (newInterview: INewInterviewData) => {
        return await smsClient.post(interviewContext + '/new', newInterview);
    },

    getInterview: async (interviewId: number) => {
        return await smsClient.get(`${interviewContext}/${interviewId}`);
    },

    fetchPage: (pageNumber?: number, pageSize?: number, orderBy = 'id', direction = 'ASC',
        associateEmail = 'associateEmail', managerEmail = 'managerEmail',
        place = "placeName", clientName = "clientName", input = 'associateInput', feedback = 'feedback') => {
        const currentUser = store.getState().managementState.auth.currentUser;
        const roles = currentUser.roles
        console.log(roles);
        const email = currentUser.email
        console.log(currentUser);
        const isAdmin = (roles.includes(cognitoRoles.ADMIN) || roles.includes(cognitoRoles.STAGING_MANAGER) || roles.includes(cognitoRoles.TRAINER));


        let url = interviewContext;
       
        // an associate user, uses pages endpoint instead of page
        url += '/page'
        if (!isAdmin) { url += 's' }
        
        url += '?search=associateEmail:';
        
        if (associateEmail === '') { url += isAdmin ? '*' : email; }
        else { url += (isAdmin ? associateEmail : email); }

        if (managerEmail === '') { url += ',managerEmail:*'; }
        else { url += ',managerEmail:' + managerEmail; }

        url += `,place:${place},client:${clientName},associateInput:${input},feedback:${feedback}`

        if (!isAdmin) {
            url += '&orderBy=' + orderBy + '&direction=' + direction;
        }
        if (pageNumber) {
            url += '&pageNumber=' + pageNumber;
        }
        if (pageSize) {
            url += '&pageSize=' + pageSize;
        }
     
        return smsClient.get(url);
    },



    assocNeedFeedback: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/AssociateNeedFeedback/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    assocNeedFeedbackChart: async () => {
        return await smsClient.get(interviewContext + `/reports/AssociateNeedFeedback/chart`);
    },

    interviewPerAssoc: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/InterviewsPerAssociate/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewPerAssocStats: async () => await smsClient.get(
        interviewContext + '/reports/InterviewsPerAssociate/chart'
    ),

    getAssocMoreThanFiveInterviews: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/dashboard/interviews/associate/fiveormore/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    sendFeedback: async (feedback: any) => {
        return await smsClient.post(interviewContext + `/feedback`, feedback);
    },

    updateFeedback: async (interviewId: any, feedback: any) => {
        return await smsClient.patch(interviewContext + `/Feedback/InterviewId/${interviewId}`, feedback)
    },

    fetchManager24: async () => {
        return await smsClient.get(interviewContext + `/reports/request24/manager`);
    },

    fetchAssoc24: async () => {
        return await smsClient.get(interviewContext + `/reports/request24/associate`);
    },

    fetch24: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/interview24/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJD: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/interviewJD/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJDChart: async () => {
        return await smsClient.get(interviewContext + `/reports/interviewJD/`);

    },
    fetchClient: async () => {
        return await smsClient.get(interviewContext + `/client`);
    },

    submitAssocInput: async (payload: any) => {
        return await smsClient.post(interviewContext + '/associateInput', payload);
    },

    fetchInterviewFeedback: async (interviewId: number) => {
        return await smsClient.get(interviewContext + `/Feedback/InterviewId/${interviewId}`);
    },

    fetchFeedbackStats: async (pageNumber: number, pageSize: number) => {
        return await smsClient.get(interviewContext + '/reports/FeedbackStats/page', {
            params: { pageNumber, pageSize }
        })
    },

    markInterviewAsReviewed: (id: number) => {
        return smsClient.get(interviewContext + '/markReviewed/' + id);
    },

    getCalendarWeek: async (date: number | Date) => {

        // Pass an epoch date number instead of a Date object, but accept
        // either one for convenience or to account for user error
        let epochDate = typeof date === 'number' ? date : date.getTime();

        return await smsClient.get(`${interviewContext}/CalendarWeek/${epochDate}`);
    }
}
