import * as React from 'react';
import {  IAuthState } from '../../reducers/management';
import {IState} from '../../reducers'
import { connect } from 'react-redux';
// import ResetFirstPasswordComponent from '../resetFirstPassword/ResetFirstPassword.component';
// import * as userActions from '../../actions/user/user.actions';
import { setup } from '../../actions/auth/auth.actions';

import { Auth } from 'aws-amplify';
import { RouteComponentProps } from 'react-router';
import { cognitoClient } from '../../axios/sms-clients/cognito-client';
import { toast } from 'react-toastify';
import Popover from 'reactstrap/lib/Popover';
import PopoverHeader from 'reactstrap/lib/PopoverHeader';
import PopoverBody from 'reactstrap/lib/PopoverBody';

interface IComponentState {
  cogUser: any,
  username: string,
  password: string,
  confirmationPassword: string,
  newPassword: string,
  passwordNeedsReset,
  incorrectUserPass: boolean,
  verificationCode: string,
  needsVerificationCode: boolean,
  showPasswordTip: boolean
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
      verificationCode: '',
      needsVerificationCode: false,
      showPasswordTip: false
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
  public updateVerificationCode = (e: any) => {
    const verificationCode = e.target.value;
    this.setState({
      verificationCode
    })
  }

  public submitLogin = async (e: any) => {
    e.preventDefault();
    const { username, password } = this.state; // destructuring
    this.login(username, password);
  }

  private login = async (username: string, password: string) => {
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
      this.setState({
        incorrectUserPass: true
      })
    }
  }

  public submitPasswordReset = async (e: any) => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmationPassword) {
      // You need to get the new password and required attributes from the UI inputs
      // and then trigger the following function with a button click
      // For example, the email and phone_number are required attributes
      try {
        if (this.state.needsVerificationCode) {
          console.log('submitting code')
          await Auth.forgotPasswordSubmit(this.state.username, this.state.verificationCode, this.state.newPassword);
          this.login(this.state.username, this.state.newPassword);
        } else {
          await Auth.completeNewPassword(
            this.state.cogUser,               // the Cognito User Object
            this.state.newPassword,       // the new password
            // OPTIONAL, the required attributes
            {
              email: this.state.username,
            }
          );
          this.props.setup();
          this.props.history.push('/check-ins');
        }

      } catch (err) {
        toast.error('failed to set new password');
        console.log(err);
      }
    }
  }

  public resetPassword = async () => {
    try {
      await cognitoClient.resetPassword(this.state.username);
      this.setState({
        needsVerificationCode: true,
        passwordNeedsReset: true
      })
      console.log('password reset');
    } catch (err) {
      if (err.response && err.response.data.code === 'LimitExceededException') {
        toast.error('Too Many Password Reset Attempts');
      } else {
        toast.error('Failed to Reset Password');
      }
    }
  }

  public togglePasswordTip = () => {
    this.setState({
      showPasswordTip: !this.state.showPasswordTip
    })
  }

  public render() {
    return (
      <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">
        {!this.state.passwordNeedsReset &&
          <>
            <h4 id="titleHead">Sign in to SMS</h4>
            <form id="login-form" onSubmit={this.submitLogin}>
              <input name="username" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.updateUsername} value={this.state.username} required />

              <input name="password" type="password" className="form-control txt-bx" id="login-pass" placeholder="Password" onChange={this.updatePassword} value={this.state.password} required />

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
              {this.state.needsVerificationCode &&
                <input name="verification-code" type="text" className="form-control txt-bx" placeholder="Verification Code" onChange={this.updateVerificationCode} value={this.state.verificationCode} />
              }

              <input id="new-password-input" name="password" type="password" className="form-control txt-bx" placeholder="New Password" onMouseLeave={this.togglePasswordTip} onMouseEnter={this.togglePasswordTip} onChange={this.updateNewPassword} value={this.state.newPassword}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\^$*.[\]{}()?\-!@#%&/,><':;|_~`]).{8,99}" required />

              <Popover placement="bottom" isOpen={this.state.showPasswordTip} target="new-password-input" toggle={this.togglePasswordTip}>
                <PopoverHeader>Password Requirements</PopoverHeader>
                <PopoverBody>Password must be at least 8 characters, have 1 special character, 1 number, 1 uppercase letter, and 1 lower case number</PopoverBody>
              </Popover>



              <input name="new-password" id="login-pass" type="password" className="form-control txt-bx" placeholder="Confirm Password" onChange={this.updateConfirmationPassword} value={this.state.confirmationPassword} />
              <button className="btn rev-btn">Reset</button>

            </form>
          </>
        }
        <div className="row resetDiv">
          <button id="forgot-pass-btn" onClick={this.resetPassword}>Forgot Password</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => (state.managementState.auth)
const mapDispatchToProps = {
  setup
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)