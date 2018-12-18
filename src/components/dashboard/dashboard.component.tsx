import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from 'src/model/User.model';
import ManagerContentComponent from '../manager/manager-content.component';
import { AssociateContentComponent } from '../associate/associate-content.component';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
// import { UserProfileComponent } from '../userProfile/userProfile.component';

interface IStateProps {
  user: IUser,
  roles: string[],
  match: any
}

/**
 * Dashboard render main content base on user role
 */
export class DashboardComponent extends React.Component<IStateProps> {

  public renderRoleContent = () => {
    // if (this.props.page === 'home') {
      if (this.props.roles === undefined) {
        return <Route path={this.props.match.url} component={AssociateContentComponent} />
      }
      else if (this.props.roles.includes('admin')) {
        return <Route path={this.props.match.url} component={ManagerContentComponent} />
      }
      else if (this.props.roles.includes('staging-manager')) {
        return <Route path={this.props.match.url} component={ManagerContentComponent} />
      }
      else {
        return <></>
      }
    // } else if (this.props.page === 'profile') {
      // return <UserProfileComponent />
    // } else {
      // return <></>
    // }
  }

  public render() {
    const sContent = this.renderRoleContent();
    return (
      <>
        {sContent}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {}
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(DashboardComponent))