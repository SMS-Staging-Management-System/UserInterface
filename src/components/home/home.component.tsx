import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from 'src/model/User.model';
import * as userActions from '../../actions/user/user.actions';
import DashboardComponent from '../dashboard/dashboard.component';
import LoginComponent from '../login/login.component';

interface IComponentProps {
  isLogin: boolean,
  user:  IUser,
	setup: () => { void }
}
/**
 * Home direct user to login or allow passage to dashboard if already login
 */
export class HomeComponent extends React.Component<any, IComponentProps> {

  public componentDidMount() {
    this.props.setup();
  }

  public render() {
    console.log(this.props.isLogin)
    return (
      <>  
        { !this.props.isLogin   ?
          <LoginComponent />  :
          <DashboardComponent />
        }
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {
  ...userActions
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)