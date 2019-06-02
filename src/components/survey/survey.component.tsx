import * as React from 'react';
import { Switch, Route } from 'react-router';
import SurveyNavComponent from './survey-nav/survey-nav.component'
import AssignedSurveysComponent from './assigned-surveys/assigned-surveys.component';
import SurveyBuildComponent from './survey-build/survey-build.component';
import SurveyAnalyticsComponent from './survey-analytics/survey-analytics.component';
import SurveyTakingComponent from './survey-taking/survey-taking.component';
import AllSurveysComponent from './all-surveys/all-surveys.component';
import TemplatesComponent from './templates/templates.component';
import SurveyRespondentsComponent from './survey-respondents/survey-respondents.component';
import ProtectedRoute from '../protected-route.component/protected-route.component';
import { cognitoRoles } from '../../model/cognito-user.model';


export class SurveyComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  updateSurveyTable = (groupName: string) => {
    this.props.manageGetUsersByGroup(groupName);
  }

  render() {
    let { path } = this.props.match;
    return (
      <div id="manage-users-container">
        <SurveyNavComponent
          toggleCreateUserModal={this.props.toggleCreateUserModal}
          updateSurveyTable={this.updateSurveyTable}
          manage={this.props.match.params.manage}
          history={this.props.history}
          location={this.props.location}
          match={this.props.match} />

        <Switch>
          <Route exact path={`${path}`} component={AssignedSurveysComponent} />
          <Route path={`${path}/assigned`} component={AssignedSurveysComponent} />
          <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/all-surveys`} component={AllSurveysComponent} />
          <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/build`} component={SurveyBuildComponent} />
          <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/templates`} component={TemplatesComponent} />
          <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/survey-data/:surveyId`} component={SurveyAnalyticsComponent} />
          <Route path={`${path}/survey-taking/:surveyId`} component={SurveyTakingComponent} />
          <ProtectedRoute allowedRoles={[cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]} path={`${path}/respondents-data/:surveyId`} component={SurveyRespondentsComponent} />
        </Switch>
      </div>
    )
  }
}

