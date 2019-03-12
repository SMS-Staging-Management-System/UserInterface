import React from 'react';
import { connect } from 'react-redux';
import { getInterviewPages, getNumberOfPages } from '../../actions/interviewList/interviewList.actions';
import { IState } from '../../../reducers';
import { ChartComponent } from './charts/ChartComponent';
 
export class ReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

 
    render() { 
        return ( 
        <React.Fragment>
             <h1>Interviews that received 24 Hour Notice</h1>>
            <ChartComponent/>
        </React.Fragment>
         );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);