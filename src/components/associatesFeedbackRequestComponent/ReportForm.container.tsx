import React from 'react';
import { connect } from 'react-redux';
// import { getInterviewPages, getNumberOfPages } from '../../actions/interviewList/interviewList.actions';
import { IState } from '../../reducers';
import { FeedbackChartComponent } from './charts/FeedbackChartComponent';
 
export class ReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

 
    render() { 
        return ( 
        <React.Fragment>
             <h1>Associate Interview Feedback data</h1>>
            <FeedbackChartComponent/>
        </React.Fragment>
         );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        // listOfInterviews : state.interviewState.interviewList.listOfInterviews,
        // numberOfPages : state.interviewState.interviewList.numberOfPages
    }
}
 
const mapDispatchToProps = {
    // getInterviewPages,
    // getNumberOfPages
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);