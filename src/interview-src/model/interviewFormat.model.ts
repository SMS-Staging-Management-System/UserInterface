
export const interviewformat = {
    onSite:'On Site',
    inPerson: 'In Person',
    videoCall: 'Video Call',
    phoneCall: 'Phone Call'
}

export const allInterviewFormats =  Object.keys(interviewformat).map(key => {
    if(interviewformat.hasOwnProperty(key)){
        return interviewformat[key];
    }
});