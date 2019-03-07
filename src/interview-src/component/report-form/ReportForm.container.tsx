import React from 'react';


 
 
export class ReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

 
    render() { 
        return ( 
        <div>Report</div>
         );
    }
}
/*
const mapStateToProps = (state: IState) => {
    return {
        listOfInterviews : state.interviewState.interviewList.listOfInterviews,
        numberOfPages : state.interviewState.interviewList.numberOfPages
    }
}
 
const mapDispatchToProps = {
    getInterviewPages,
    getNumberOfPages
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);*/