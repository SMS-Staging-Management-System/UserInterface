import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
// import ResetFirstPasswordComponent from '../resetFirstPassword/ResetFirstPassword.component';
// import * as userActions from '../../actions/user/user.actions';
import {cognitoLogin} from '../../actions/auth/auth.actions';
import { History } from 'history';

interface IComponentState {
  cogUser: object,
  username: string,
  password: string,
  confirmationPassword: string,
  newPassword: string,
  isFirstSignin,
  incorrectUserPass
}

interface IComponentProps {
  cognitoLogin: (username: string, password: string, history: History) => { void },
  initUser: () => { void },
  isFirstSignin: boolean,
  cogUser: any,
  history: History
}

export class LoginComponent extends React.Component<IComponentProps, IComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      cogUser: {},
      confirmationPassword: '',
      incorrectUserPass: false,
      isFirstSignin: false,
      newPassword: '',
      password: '',
      username: '',
    }
  }

  public updateUsername = (e: any) => {
    const username = e.target.value;
    this.setState({
      ...this.state,
      username

    })
  }

  public updatePassword = (e: any) => {
    const password = e.target.value;
    this.setState({
      ...this.state,
      password
    })
  }
  public updateConfirmationPassword = (e: any) => {
    const password = e.target.value;
    this.setState({
      ...this.state,
      confirmationPassword: password
    })
  }
  public updateNewPassword = (e: any) => {
    const password = e.target.value;
    this.setState({
      ...this.state,
      newPassword: password
    })
  }

  public onSuccess = (result: awsCognito.CognitoUserSession) => {
    this.props.initUser();
  }

  public onFailure = (err: any) => {
    console.log(err);
    if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
      this.setState({
        incorrectUserPass: true
      })
      // todo: add error message to state
      //   this.props.updateError('Invalid Credentials, try again.');
    } else if (err.code === 'PasswordResetRequiredException') {
      // todo: ensure reset password works
      //   this.props.resetPassword(this.props.password);
    } else {
      // todo: update the states error message instead
      //   this.props.updateError('Unable to login at this time, please try again later');
    }
  }

  public submit = (e: any) => {
    e.preventDefault();
    const { username, password } = this.state; // destructuring
    this.props.cognitoLogin(username, password, this.props.history);
  }

  public handlePassChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  public render() {
    return (
      <>
        {!this.props.isFirstSignin &&
          <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">

            <h4 id="titleHead">Sign in to SMS</h4>
            <form id="login-form" onSubmit={this.submit}>
              <input id="user" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.updateUsername} />

              <input type="password" className="form-control txt-bx" id="login-pass" placeholder="Password" onChange={this.updatePassword} />
              <button className="btn rev-btn">Login</button>

            </form>

            {this.state.incorrectUserPass &&
              <h6 id="invalidCredHead">Invalid Credentials</h6>
            }
            <div className="rememberDiv">
            </div>
            <div className="row resetDiv">
              <button id="forgot-pass-btn">Forgot Username or Password</button>
            </div>
          </div>
        }
        {this.props.isFirstSignin && null
          // <ResetFirstPasswordComponent
          //   cognitUser={this.props.cogUser}
          //   code={this.state.password}
          //   setup={this.props.initUser} />
        }
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.auth)
const mapDispatchToProps = {
  cognitoLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)