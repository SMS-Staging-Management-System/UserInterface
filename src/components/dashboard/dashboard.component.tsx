import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from 'src/model/User.model';
import { ManagerContentComponent } from '../manager/manager-content.component';
import { AssociateContentComponent } from '../associate/associate-content.component';

interface IStateProps {
  user:   IUser,
  roles:  string[]
}

/**
 * Dashboard render main content base on user role
 */
export class DashboardComponent extends React.Component<IStateProps> {

  public renderRoleContent = () => {
    console.log(this.props)
    if(this.props.roles.includes("admin")) {
      return <ManagerContentComponent />  
    } else {
      return <AssociateContentComponent />
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