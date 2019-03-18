import React from 'react'
import ReportForm from "../components/report-form/ReportFormComponent"
import { AssociatesFeedbackRequest } from "../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component"
import { Switch, Route } from 'react-router';
import InterviewList from '../components/InterviewList/InterviewList';
import { Testing } from '../components/testing/Testing.component';
import createInterviewComponent from '../components/creaInterviewComponent/createInterview.component';
import interviewFeedbackComponent from '../components/interviewFeedbackComponent/interviewFeedback.component';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props:any){
        super(props)
    }

    render() {
        //let {path} = this.props.match//get the path from url
        //put path in front of any sub paths
        let {path} =this.props.match
        return (
            <Switch>
                <Route path={`${path}/reports`} component={ReportForm} />
                <Route path={`${path}/list`} component={InterviewList} />
                {/* This is for Ben, please don't delete */}
                <Route path={`${path}/testing`} component={Testing} />
				<Route path={`${path}/arc`} component={AssociatesFeedbackRequest} />
                <Route path={`${path}/new`} component={createInterviewComponent} />
                <Route path={`${path}/:interviewId/feedback`} component={ interviewFeedbackComponent} />
             </Switch>
        )
    }
}