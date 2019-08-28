import React from 'react'
//import { AssociatesFeedbackRequest } from "../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component"
import { Switch, Route } from 'react-router';
import InterviewList from '../components/InterviewList/InterviewList';
import createInterviewComponent from '../components/creaInterviewComponent/createInterview.component';
import interviewFeedbackComponent from '../components/interviewFeedbackComponent/interviewFeedback.component';
import AssociateInput from '../components/associate-input/associate-inputs.component';
import ViewAssociateInput from '../components/view-assoc-input/view-assoc-input.component';
import { ViewInterviewFeedbackComponent } from '../components/interviewFeedbackComponent/ViewInterviewFeedbackComponent';
import { ReportsPage } from '../components/interviewreportspage/interviewreportspage';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        //let {path} = this.props.match//get the path from url
        //put path in front of any sub paths
        let { path } = this.props.match
        return (
            <Switch>
                <Route path={`${path}/report/AssociatesFeedbackRequest`} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/associateInput`} component={AssociateInput} />
                <Route path={`${path}/viewFeedback`} component={ViewInterviewFeedbackComponent} />
                <Route path={`${path}/new`} component={createInterviewComponent} />
                <Route path={`${path}/:interviewId/feedback`} component={interviewFeedbackComponent} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/viewAssocInput`} component={ViewAssociateInput} />
                <Route path={`${path}/reports`} component={ReportsPage} />
            </Switch>
        )
    }
}