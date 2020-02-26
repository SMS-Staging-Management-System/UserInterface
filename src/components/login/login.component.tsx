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
    const password = this.props.login.password 
    this.props.loginRequest(username, password, this.props.history);
  }

  clearForm = ()=>{
    
    
  }

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
              <h6 id="invalidCredHead" >Invalid Credentials</h6> 
              
            }
            
          </>
      </div>
    );
  }
}



