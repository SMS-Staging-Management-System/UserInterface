import { IInterviewListState } from ".";
import { interviewListTypes } from "../../actions/interviewList/interviewList.actions";

const initialState : IInterviewListState = {
    numberOfPages : 6,
    listOfInterviews : [{interviewId: 1, place: "1 One"}, {interviewId: 2, place: "2 Two"}, {interviewId: 3, place: "3 Three"},
                 {interviewId: 8, place: "4 Four"}, {interviewId: 7, place: "5 Five"}, {interviewId: 6, place: "6 Six"}, {interviewId: 5, place: "7 Seven"}, {interviewId: 4, place: "Eight"},
                 {interviewId: 9, place: "9 Nine"}, {interviewId: 10, place: "10Ten"}, {interviewId: 11, place: "11 Eleven"}, {interviewId: 12, place: "12 Twelve"},
                 {interviewId: 17, place: "13 Thirteen"}, {interviewId: 16, place: "14 Fourteen"}, {interviewId: 15, place: "15 Fifteen"}, {interviewId: 14, place: "Sixteen"}, {interviewId: 13, place: "Seventeen"},
                 {interviewId: 18, place: "18 Eightteen"}, {interviewId: 19, place: "19 Nineteen"},{interviewId: 20, place: "20 Twenty"},
                 {interviewId: 23, place: "21 Twenty-One"},{interviewId: 22, place: "22 Twenty-Two"},{interviewId: 21, place: "23 Twenty-Three"},
                 {interviewId: 24, place: "24 Twenty-Four"},{interviewId: 25, place: "25 Twenty-Five "},{interviewId: 26, place: "26 Twenty-Six"}],
    orderBy : 'id',
    direction : 'ASC',
    pageSize : 5,
    currentPage : 0,
    assocInput: undefined,
}
/**Dummy data
 [{interviewId: 1,
        managerId: 1,
        associateId: 1,
        scheduled: new Date(), 
        notified: new Date(), 
        reviewed: new Date(), 
        associateInput:, 
        feedback: {
            interviewFeedbackId: 1,
            feedbackRequested: new Date(),
            feedback: "Solid interview.",
            feedbackReceived: new Date(),
            status: {
                feedbackStatusId: 1,
                statusDesc: "good status"
            },
            feedbackDelivered: new Date(),
            interview: null, 

         }, 
         place: "1 One"}]
 */
export const interviewListReducer = (state = initialState, action : any): IInterviewListState => {
    switch (action.type) {
        case interviewListTypes.GET_PAGES :
            return {
                ...state,
                ...action.payload
            }

        case interviewListTypes.SET_SELECTED :
            return {
                ...state,
                assocInput: { ...action.payload }
            };
            
        default:
            return state
    }
}