import { INewInterviewData } from "../../model/INewInterviewData";
import { store } from "../../Store";
import { smsClient } from ".";
<<<<<<< HEAD
import { cognitoRoles } from "../../model/cognito-user.model";
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

const interviewContext = '/interview-service/interview';

export const interviewClient = {
    testfetch: async () => {
        return await smsClient.get(interviewContext);
    },

    addNewInterview: async (newInterview: INewInterviewData) => {
        return await smsClient.post(interviewContext + '/new', newInterview);
    },
<<<<<<< HEAD

    getInterview: async (interviewId: number) => {
        return await smsClient.get(`${interviewContext}/${interviewId}`);
    },

    fetchPage: (pageNumber?: number, pageSize?: number, orderBy = 'id', direction = 'ASC',
        associateEmail = 'associateEmail', managerEmail = 'managerEmail',
        place = "placeName", clientName = "clientName", staging = 'stagingOff') => {
=======
  
    getInterview: async (interviewId: number) => {
        return await smsClient.get(`${interviewContext}/${interviewId}`);
    },
    
    fetchPage: (pageNumber? : number, pageSize? : number, orderBy = 'id', direction='ASC') => {
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        const currentUser = store.getState().managementState.auth.currentUser;
        console.log(currentUser);
        const roles = currentUser.roles
        const email = currentUser.email
<<<<<<< HEAD
        const isAdmin = (roles.includes(cognitoRoles.ADMIN) || roles.includes(cognitoRoles.STAGING_MANAGER) || roles.includes(cognitoRoles.TRAINER));

        let url = interviewContext;
        url += '/page'
        //Comment out line below to make backend calls work (AS OF 8/26/2019)
        if (!isAdmin) url += 's'
=======
        const isAdmin = (roles.includes('admin') || roles.includes('staging-manager') || roles.includes('trainer'));

        let url = interviewContext;
        url += '/page'
        if(!isAdmin) url += 's'
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        url += '?orderBy=' + orderBy + '&direction=' + direction;
        if (pageNumber) {
            url += '&pageNumber=' + pageNumber;
        }
        if (pageSize) {
            url += '&pageSize=' + pageSize;
        }
<<<<<<< HEAD
        if (!isAdmin)
            url += '&email=' + email;
        url += '&associateEmail=' + associateEmail;
        url += '&managerEmail=' + managerEmail;
        url += '&place=' + place;
        url += '&clientName=' + clientName;
        url += '&staging=' + staging;
        console.log(url);
        // DUMMY DATA
        // return {
        //    data: {
        //        content: [{ associateEmail: 'test', managerEmail: 'test', place: 'test', client: { clientName: 'test' }, staging: 'STAGING_ON' }
        //            , { associateEmail: 'test', managerEmail: 'test2', place: 'test2', client: { clientName: 'test' }, staging: 'STAGING_OFF' }],//resp.data.content,
        //        numberOfPages: 1,
        //        totalPages: 2,
        //        currentPage: 1,
        //        pageSize: 2,
        //        orderBy: orderBy,
        //        direction: direction
        //    }
        // }
=======
        if(!isAdmin)
            url += '&email=' + email;
        
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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

<<<<<<< HEAD
    interviewPerAssocStats: async () => await smsClient.get(
        interviewContext + '/reports/InterviewsPerAssociate/chart'
    ),

    getAssocMoreThanFiveInterviews: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/dashboard/interviews/associate/fiveormore/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    sendFeedback: async (feedback: any) => {
        return await smsClient.post(interviewContext + `/feedback`, feedback);
    },

<<<<<<< HEAD
    updateFeedback: async (interviewId: any, feedback: any) => {
        return await smsClient.patch(interviewContext + `/Feedback/InterviewId/${interviewId}`, feedback)
    },

=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    fetchManager24: async () => {
        return await smsClient.get(interviewContext + `/reports/request24/manager`);
    },

    fetchAssoc24: async () => {
        return await smsClient.get(interviewContext + `/reports/request24/associate`);
    },

<<<<<<< HEAD
    fetch24: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/interview24/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJD: async (pageNumber: number, PageSize: number) => {
        return await smsClient.get(interviewContext + `/reports/interviewJD/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJDChart: async () => {
        return await smsClient.get(interviewContext + `/reports/interviewJD/`);
=======
    fetch24: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/reports/interview24/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJD: async (pageNumber:number, PageSize:number) => {
        return await smsClient.get(interviewContext+`/reports/interviewJD/page?pageNumber=${pageNumber}&pageSize=${PageSize}`);
    },

    interviewJDChart: async () => {
        return await smsClient.get(interviewContext+`/reports/interviewJD/`);
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

    },
    fetchClient: async () => {
        return await smsClient.get(interviewContext + `/client`);
    },

    submitAssocInput: async (payload: any) => {
        return await smsClient.post(interviewContext + '/associateInput', payload);
    },

    fetchInterviewFeedback: async (interviewId: number) => {
<<<<<<< HEAD
        return await smsClient.get(interviewContext + `/Feedback/InterviewId/${interviewId}`);
    },

    fetchFeedbackStats: async (pageNumber: number, pageSize: number) => {
        return await smsClient.get(interviewContext + '/reports/FeedbackStats/page', {
            params: { pageNumber, pageSize }
        })
=======
        return await smsClient.get(interviewContext + `/Feedback/InterviewId/${interviewId}`);;
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    },

    markInterviewAsReviewed: (id: number) => {
        return smsClient.get(interviewContext + '/markReviewed/' + id);
<<<<<<< HEAD
    },

    getCalendarWeek: async (date: number | Date) => {

        // Pass an epoch date number instead of a Date object, but accept
        // either one for convenience or to account for user error
        let epochDate = typeof date === 'number' ? date : date.getTime();

        return await smsClient.get(`${interviewContext}/CalendarWeek/${epochDate}`);
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    }
}