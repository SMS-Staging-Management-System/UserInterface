
import * as React from 'react';
import { Switch, Route } from 'react-router';
import ProtectedRoute from '../protected-route.component/protected-route.component';
import DashboardNav from './dashboard-nav/DashboardNav';
import ByVirtual from './modules/byVirtual/ByVirtual';
import Dropped from './modules/dropped/Dropped';
import ToStaging from './modules/toStaging/ToStaging';
import FiveOrMore from './modules/fiveOrMore/FiveOrMore';
import NumInterviews from './modules/numInterviews/NumInterviews';
import PausedAssociates from './modules/pausedAssociates/PausedAssociates';
import ThreeInterviews from './modules/threeInterviews/ThreeInterviews';


export class Dashboard extends React.Component<any, any> {

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
        <DashboardNav
          toggleCreateUserModal={this.props.toggleCreateUserModal}
          updateSurveyTable={this.updateSurveyTable}
          manage={this.props.match.params.manage}
          history={this.props.history}
          location={this.props.location}
          match={this.props.match} />

        <Switch>
          <Route exact path={`${path}`} component={ByVirtual} />
          <Route path={`${path}/home`} component={ByVirtual} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/byVirtual`} component={ByVirtual} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/dropped`} component={Dropped} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/toStaging`} component={ToStaging} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/fiveOrMore`} component={FiveOrMore} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/numInterviews`} component={NumInterviews} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/pausedAssociates`} component={PausedAssociates} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/threeInterviews`} component={ThreeInterviews} />
        </Switch>
      </div>
    )
  }
}

