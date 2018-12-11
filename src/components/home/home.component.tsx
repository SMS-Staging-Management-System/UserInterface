import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
// import LoginComponent from '../login/login.component';
// import DashboardComponent from '../dashboard/dashboard.component';

export class HomeComponent extends React.Component {
  public render() {
    return (
      <>  
        {/* { !this.props.login   ?
          <LoginComponent />  :
          <DashboardComponent />
        } */}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)