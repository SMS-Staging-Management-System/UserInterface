import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import LoginComponent from '../login/login.component';
import { IUser } from 'src/model/User.model';
import DashboardComponent from '../dashboard/dashboard.component';

interface IStateProps {
  login: boolean,
  user:  IUser
}

/**
 * Home direct user to login or allow passage to dashboard if already login
 */
export class HomeComponent extends React.Component<IStateProps> {

  public render() {
    return (
      <>  
        { !this.props.login   ?
          <LoginComponent />  :
          <DashboardComponent />
        }
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)