import React from 'react'
import ReportForm from "../components/report-form/ReportFormComponent"
import FeedbackReportForm from "../components/associatesFeedbackRequestComponent/ReportFormComponent"
//import { AssociatesFeedbackRequest } from "../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component"
import { Switch, Route } from 'react-router';
import InterviewList from '../components/InterviewList/InterviewList';
import createInterviewComponent from '../components/creaInterviewComponent/createInterview.component';
import interviewFeedbackComponent from '../components/interviewFeedbackComponent/interviewFeedback.component';
import AssociateInput from '../components/associate-input/associate-inputs.component';
import { AssociatesFeedbackRequest } from '../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component';
import { interview24Request } from '../components/interview24/interview24.component';
import { interviewJDRequest } from '../components/interviewJD/interviewJD.component';
import JDReportForm from '../components/interviewJD/ReportFormComponent';


import { InterviewPerAssoc } from '../components/interviewsPerAssocComponent/interviewsPerAssocComponent.component';
import ViewAssociateInput from '../components/view-assoc-input/view-assoc-input.component';
import { ViewInterviewFeedbackComponent } from '../components/interviewFeedbackComponent/ViewInterviewFeedbackComponent';


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
                <Route path={`${path}/report/24hour/charts`} component={ReportForm} />
                <Route path={`${path}/report/24hour`} component={interview24Request} />
				<Route path={`${path}/report/jobDesc/charts`} component={JDReportForm} />
				<Route path={`${path}/report/jobDesc`} component={interviewJDRequest} />
                <Route path={`${path}/report/feedback/charts`} component={FeedbackReportForm} />
                <Route path={`${path}/report/AssociateInterviews`} component={InterviewPerAssoc} />
                <Route path={`${path}/report/feedback`} component={AssociatesFeedbackRequest} />
                <Route path={`${path}/report/AssociatesFeedbackRequest`}/>
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/associateInput`} component={AssociateInput} />
                <Route path={`${path}/viewFeedback`} component={ViewInterviewFeedbackComponent} />
                <Route path={`${path}/new`} component={createInterviewComponent} />
                <Route path={`${path}/:interviewId/feedback`} component={ interviewFeedbackComponent} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/viewAssocInput`} component={ViewAssociateInput} />
             </Switch>
        )
    }
}