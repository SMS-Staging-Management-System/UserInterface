import * as React from 'react';
import { ILoginState } from '../../reducers/management';
import { RouteComponentProps} from 'react-router';
import ResetPasswordComponent from '../resetPassword/reset-password.container';

interface ILoginProps extends RouteComponentProps<{}> {
  login: ILoginState,
  match: any,
  location: any;
  history: any;
  staticContext?: any;
  updateUsername: (username: string) => void,
  updatePassword: (password: string) => void,
  // updateConfirmationPassword: (confirmationPassword: string) => void,
 //  updateNewPassword: (newPassword: string) => void,
 // updateVerificationCode: (verificationCode: string) => void,
  //submitLogin: () => void,
  loginRequest: (username: string, password: string, history) => void,
 // setup: () => void,
 resetPassword: (username: string) => void,






}


export class LoginComponent extends React.Component<ILoginProps, any> {

  constructor(props) {
    super(props);
  
  }

  updateUsername = (event) => {
    event.preventDefault();
    this.props.updateUsername(event.target.value)
  }

  updatePassword = (event) => {
    event.preventDefault();
    this.props.updatePassword(event.target.value);
  }
 // updateConfirmationPassword = (event) => {
    /* const password = e.target.value;
    this.setState({
      ...this.state,
      confirmationPassword: password
    }) */
  //  event.preventDefault();
  //  this.props.updateConfirmationPassword(event.target.value);
 // }
 // updateNewPassword = (event) => {
    /* const password = e.target.value;
    this.setState({
      ...this.state,
      newPassword: password
    }) */
  //  event.preventDefault();
  //  this.props.updateNewPassword(event.target.value);
/*   }
  updateVerificationCode = (event) => {
    /* const verificationCode = e.target.value;
    this.setState({
      verificationCode
    }) */
  //  event.preventDefault();
 //   this.props.updateVerificationCode(event.target.value)
 // }

  submitLogin = (event) => {
    event.preventDefault();
    const username = this.props.login.username;
    const password = this.props.login.password // destructuring
    this.props.loginRequest(username, password,this.props.history);
  }


  /* submitPasswordReset = async (e: any) => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmationPassword) {
      // You need to get the new password and required attributes from the UI inputs
      // and then trigger the following function with a button click
      // For example, the email and phone_number are required attributes
      try {
        if (this.state.needsVerificationCode) {
          console.log('submitting code')
          await Auth.forgotPasswordSubmit(this.state.username, this.state.verificationCode, this.state.newPassword);
          this.loginRequest(this.state.username, this.state.newPassword);
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
  } */

   /* resetPassword = async () => {
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
        console.log(err);
        toast.error('Failed to Reset Password');
      }
    }
  }  */
  resetPassword = (event) => {
    event.preventDefault();
    this.props.resetPassword(this.props.login.username);
}
 


  render() {
    const username = this.props.login.username;
    const password = this.props.login.password;
    return (
      <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">
        {!this.props.login.passwordNeedsReset &&
          <>
            <h4 id="titleHead">Sign in to SMS</h4>
            <form id="login-form" onSubmit={this.submitLogin}>
              <input name="username" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.updateUsername} value={username} required />

              <input name="password" type="password" className="form-control txt-bx" id="login-pass" placeholder="Password" onChange={this.updatePassword} value={password} required />

              <button className="btn rev-btn" type="submit">Login</button>
            </form>

            {this.props.login.incorrectUserPass &&
              <h6 id="invalidCredHead">Invalid Credentials</h6>
            } 
            {this.props.login.passwordNeedsReset &&

            <ResetPasswordComponent/>
            }

          </>
        }
            
          <>
          
            {/* <h4 id="titleHead">Reset Password</h4>
            <form id="login-form" onSubmit={this.submitPasswordReset}>
              {this.props.needsVerificationCode &&
                <input name="verification-code" type="text" className="form-control txt-bx" placeholder="Verification Code" onChange={this.updateVerificationCode} value={this.props.verificationCode} />
              }

              <input id="new-password-input" name="password" type="password" className="form-control txt-bx" placeholder="New Password" onMouseLeave={this.togglePasswordTip} onMouseEnter={this.togglePasswordTip} onChange={this.updateNewPassword} value={this.props.newPassword}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\^$*.[\]{}()?\-!@#%&/,><':;|_~`]).{8,99}" required />

              <Popover placement="bottom" isOpen={this.props.showPasswordTip} target="new-password-input" toggle={this.togglePasswordTip}>
                <PopoverHeader>Password Requirements</PopoverHeader>
                <PopoverBody>Password must be at least 8 characters, have 1 special character, 1 number, 1 uppercase letter, and 1 lower case number</PopoverBody>
              </Popover>



              <input name="new-password" id="login-pass" type="password" className="form-control txt-bx" placeholder="Confirm Password" onChange={this.updateConfirmationPassword} value={this.state.confirmationPassword} />
              <button className="btn rev-btn">Reset</button>

            </form> */}
          </>
        
         <div className="row resetDiv">
          <button id="forgot-pass-btn" onClick={this.resetPassword}>Forgot Password</button>
        </div> 
      </div>
    );
  }
}



