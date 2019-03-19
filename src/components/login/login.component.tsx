import * as React from 'react';
import { ILoginState } from '../../reducers/management';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface ILoginProps extends RouteComponentProps<{}> {
  login: ILoginState,
  match: any,
  location: any;
  history: any;
  staticContext?: any;
  updateUsername: (username: string) => void,
  updatePassword: (password: string) => void,
  loginRequest: (username: string, password: string, history) => void,






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


  submitLogin = (event) => {
    event.preventDefault();
    const username = this.props.login.username;
    const password = this.props.login.password // destructuring
    this.props.loginRequest(username, password, this.props.history);
  }


  /* submitPasswordReset = async (e: any) => {
    e.preventDefault();
    //Make sure our two password fields are equal
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
          //Same as above, probably shouldn't go here anymore
          this.props.history.push('/check-ins');
        }

      } catch (err) {
        toast.error('failed to set new password');
        console.log(err);
      }
    }
  } */

  

  render() {
    const username = this.props.login.username;
    const password = this.props.login.password;
    return (
      <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">
        
          <>
            <h4 id="titleHead">Sign in to SMS</h4>
            <form id="login-form" onSubmit={this.submitLogin}>
              <input name="username" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.updateUsername} value={username} required />

              <input name="password" type="password" className="form-control txt-bx" id="login-pass" placeholder="Password" 
              onChange={this.updatePassword} value={password} required />

              <button className="btn rev-btn" type="submit">Login</button>
            </form>
            <div className="row resetDiv">
              <Link to="/management/send-email">
                <button id="forgot-pass-btn">Forgot Password</button>
              </Link>
            </div>
            {this.props.login.incorrectUserPass &&
              <h6 id="invalidCredHead">Invalid Credentials</h6>
            }

          </>
      </div>
    );
  }
}



