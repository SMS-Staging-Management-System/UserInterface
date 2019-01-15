import * as React from 'react';
import { IState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';
// import ResetFirstPasswordComponent from '../resetFirstPassword/ResetFirstPassword.component';
// import * as userActions from '../../actions/user/user.actions';
import { setup } from '../../actions/auth/auth.actions';

import { Auth } from 'aws-amplify';
import { RouteComponentProps } from 'react-router';

interface IComponentState {
  cogUser: any,
  username: string,
  password: string,
  confirmationPassword: string,
  newPassword: string,
  passwordNeedsReset,
  incorrectUserPass
}

interface IComponentProps extends IAuthState, RouteComponentProps<{}> {
  setup
}

export class LoginComponent extends React.Component<IComponentProps, IComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      cogUser: undefined,
      confirmationPassword: '',
      incorrectUserPass: false,
      newPassword: '',
      password: '',
      passwordNeedsReset: false,
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

  public submitLogin = async (e: any) => {
    e.preventDefault();
    const { username, password } = this.state; // destructuring
    try {
      const user = await Auth.signIn({
        password,
        username, // Required, the username
      })
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setState({
          ...this.state,
          cogUser: user,
          passwordNeedsReset: true,

        });
      } else {
        this.props.history.push('/check-ins');
        this.props.setup();
      }
    } catch (err) {
      console.log(err);
    }
    // this.props.cognitoLogin(username, password, this.props.history);
  }

  public submitPasswordReset = async (e: any) => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmationPassword) {
      // You need to get the new password and required attributes from the UI inputs
      // and then trigger the following function with a button click
      // For example, the email and phone_number are required attributes
      await Auth.completeNewPassword(
        this.state.cogUser,               // the Cognito User Object
        this.state.newPassword,       // the new password
        // OPTIONAL, the required attributes
        {
          email: this.state.username,
        }
      );
      this.props.setup();
    }
  }

  public handlePassChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  public render() {
    return (
      <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">
        {!this.state.passwordNeedsReset &&
          <>
            <h4 id="titleHead">Sign in to SMS</h4>
            <form id="login-form" onSubmit={this.submitLogin}>
              <input name="username" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.updateUsername} value={this.state.username} />

              <input name="password" type="password" className="form-control txt-bx" id="login-pass" placeholder="Password" onChange={this.updatePassword} value={this.state.password}/>
              <button className="btn rev-btn">Login</button>

            </form>

            {this.state.incorrectUserPass &&
              <h6 id="invalidCredHead">Invalid Credentials</h6>
            }
          </>
        }
        {this.state.passwordNeedsReset &&
          <>
            <h4 id="titleHead">Reset Password</h4>
            <form id="login-form" onSubmit={this.submitPasswordReset}>
              <input  type="text" className="form-control txt-bx" placeholder="New Password" onChange={this.updateNewPassword} value={this.state.newPassword} />

              <input id="login-pass" type="password" className="form-control txt-bx" placeholder="Confirm Password" onChange={this.updateConfirmationPassword} value={this.state.confirmationPassword} />
              <button className="btn rev-btn">Reset</button>

            </form>
          </>
          // <ResetFirstPasswordComponent
          //   cognitUser={this.props.cogUser}
          //   code={this.state.password}
          //   setup={this.props.initUser} />
        }
        <div className="row resetDiv">
          <button id="forgot-pass-btn">Forgot Username or Password</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.auth)
const mapDispatchToProps = {
  setup
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)