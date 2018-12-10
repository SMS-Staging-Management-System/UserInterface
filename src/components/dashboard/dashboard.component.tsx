import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from 'src/model/User.model';
import ManagerContentComponent from '../manager/manager-content.component';

interface IStateProps {
  login: boolean,
  user:  IUser
}

/**
 * Dashboard render main content base on user role
 */
export class DashboardComponent extends React.Component<IStateProps> {

  public renderRoleContent = () => {
    if(this.props.user.role) {
      return <ManagerContentComponent />  
    } else if(this.props.user.role === 'associate') {
      return <></>
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