import * as React from 'react';
import { Switch } from 'react-router';
import ProtectedRoute from '../protected-route.component/protected-route.component';
import ByStaging from './modules/byStaging/ByStaging';
import Dropped from './modules/dropped/Dropped';
import ToStaging from './modules/toStaging/ToStaging';
import FiveOrMore from './modules/fiveOrMore/FiveOrMore';
import NumInterviews from './modules/numInterviews/NumInterviews';
import PausedAssociates from './modules/pausedAssociates/PausedAssociates';
import ThreeInterviews from './modules/threeInterviews/ThreeInterviews';
import Home from './modules/home/Home';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { cognitoRoles } from '../../model/cognito-user.model';



 class Dashboard extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount(){
    
  }
  componentDidUpdate(){
    if(this.props.auth.currentUser.roles.some(role => role === cognitoRoles.STAGING_MANAGER || role === cognitoRoles.ADMIN )){
      if(this.props.match.path =='/'){
        this.props.history.push(`dashboard/home`);
      }
      if(`${this.props.match.path}/home` !='/dashboard/home' && this.props.match.path !='/' ){
        this.props.history.push(`${this.props.match.path}/home`);
      }
    }else if(this.props.auth.currentUser.roles.some(role => role === cognitoRoles.TRAINER)){

      this.props.history.push(`management/manage/cohorts`);
    }
    else{
      this.props.history.push(`surveys`);
    }
  }

  render() {
    if(this.props.auth.currentUser.roles==null){
      return <>
          user not set
      
      </>
    }
    let { path } = this.props.match;
    return (
      <div id="manage-users-container">
        {/* <DashboardNav
          manage={this.props.match.params.manage}
          history={this.props.history}
          location={this.props.location}
          match={this.props.match} /> */}

        <Switch>
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/home`} component={Home} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/byStaging`} component={ByStaging} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/dropped`} component={Dropped} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/toStaging`} component={ToStaging} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/fiveOrMore`} component={FiveOrMore} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/numInterviews`} component={NumInterviews} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/pausedAssociates`} component={PausedAssociates} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/threeInterviews`} component={ThreeInterviews} />
          <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path={`${path}/`} component={Home} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state: IState) => ({
  auth: state.managementState.auth
});
export default connect(mapStateToProps)(Dashboard);