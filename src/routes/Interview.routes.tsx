import React from 'react'
<<<<<<< HEAD
=======
import ReportForm from "../components/report-form/ReportFormComponent"
import FeedbackReportForm from "../components/associatesFeedbackRequestComponent/ReportFormComponent"
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
//import { AssociatesFeedbackRequest } from "../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component"
import { Switch, Route } from 'react-router';
import InterviewList from '../components/InterviewList/InterviewList';
import createInterviewComponent from '../components/creaInterviewComponent/createInterview.component';
import interviewFeedbackComponent from '../components/interviewFeedbackComponent/interviewFeedback.component';
import AssociateInput from '../components/associate-input/associate-inputs.component';
<<<<<<< HEAD
import ViewAssociateInput from '../components/view-assoc-input/view-assoc-input.component';
import { ViewInterviewFeedbackComponent } from '../components/interviewFeedbackComponent/ViewInterviewFeedbackComponent';
import { ReportsPage } from '../components/interviewreportspage/interviewreportspage';
=======
import { AssociatesFeedbackRequest } from '../components/associatesFeedbackRequestComponent/associatesFeedbackRequestComponent.component';
import { interview24Request } from '../components/interview24/interview24.component';
import { interviewJDRequest } from '../components/interviewJD/interviewJD.component';
import JDReportForm from '../components/interviewJD/ReportFormComponent';
import { InterviewPerAssoc } from '../components/interviewsPerAssocComponent/interviewsPerAssocComponent.component';
import ViewAssociateInput from '../components/view-assoc-input/view-assoc-input.component';
import { ViewInterviewFeedbackComponent } from '../components/interviewFeedbackComponent/ViewInterviewFeedbackComponent';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71


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
<<<<<<< HEAD
=======
                <Route path={`${path}/report/24hour/charts`} component={ReportForm} />
                <Route path={`${path}/report/24hour`} component={interview24Request} />
                <Route path={`${path}/report/jobDesc/charts`} component={JDReportForm} />
                <Route path={`${path}/report/jobDesc`} component={interviewJDRequest} />
                <Route path={`${path}/report/feedback/charts`} component={FeedbackReportForm} />
                <Route path={`${path}/report/AssociateInterviews`} component={InterviewPerAssoc} />
                <Route path={`${path}/report/feedback`} component={AssociatesFeedbackRequest} />
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
                <Route path={`${path}/report/AssociatesFeedbackRequest`} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/associateInput`} component={AssociateInput} />
                <Route path={`${path}/viewFeedback`} component={ViewInterviewFeedbackComponent} />
                <Route path={`${path}/new`} component={createInterviewComponent} />
                <Route path={`${path}/:interviewId/feedback`} component={interviewFeedbackComponent} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/viewAssocInput`} component={ViewAssociateInput} />
<<<<<<< HEAD
                <Route path={`${path}/reports`} component={ReportsPage} />
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            </Switch>
        )
    }
}