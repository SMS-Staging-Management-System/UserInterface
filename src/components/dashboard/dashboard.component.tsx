import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from 'src/model/User.model';
import ManagerContentComponent from '../manager/manager-content.component';
import { AssociateContentComponent } from '../associate/associate-content.component';
import { UserProfileComponent } from '../userProfile/userProfile.component';

interface IStateProps {
  user: IUser,
  page: string,
  roles: string[]
}

/**
 * Dashboard render main content base on user role
 */
export class DashboardComponent extends React.Component<IStateProps> {

  public renderRoleContent = () => {
    if (this.props.page === 'home') {
      if (this.props.roles === undefined) {
        return <AssociateContentComponent />
      }
      else if (this.props.roles.includes('admin')) {
        return <ManagerContentComponent />
      }
      else if (this.props.roles.includes('staging-manager')) {
        return <ManagerContentComponent />
      }
      else {
        return <></>
      }
    } else if (this.props.page === 'profile') {
      return <UserProfileComponent />
    } else {
      return <></>
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)