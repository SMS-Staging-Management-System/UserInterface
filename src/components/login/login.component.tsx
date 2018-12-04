import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';

interface IState {
    username: string,
    password: string,
    confirmationPassword: string,
    newPassword: string,
    isFirstSignin

}

export class LoginComponent extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            username: '',
            password: '',
            confirmationPassword: '',
            newPassword: '',
            isFirstSignin: ''
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
        const token = result.getIdToken().getJwtToken();
        localStorage.setItem('token', token);
        // console.log(userPool.getCurrentUser());
        // console.log(result.getIdToken().decodePayload())
        // const idtok: any = result.getIdToken();
        // console.log(idtok.payload['cognito:groups']) //payload has the user info on it
    
        // navigate pages now that we have successfully logged in
        this.props.history.push('/movies'); 
      }
    
      public onFailure = (err: any) => {
        console.log(err);
        if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
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
        const { username, password } = this.props; // destructuring
        const credentials = { username, password };
    
        const authenticationData = {
          Password: credentials.password,
          Username: credentials.username,
        };
        const authenticationDetails = new awsCognito.AuthenticationDetails(authenticationData);
        const poolData = {
          ClientId: 'btajb4q70ikvmhb12jo6oo03e', // Your client id here
          UserPoolId: 'us-west-2_rwVFefjCF', // Your user pool id here
        };
        const userPool = new awsCognito.CognitoUserPool(poolData);
        const userData = {
          Pool: userPool,
          Username: credentials.username,
        };
        const cognitoUser = new awsCognito.CognitoUser(userData);
        this.props.updateCognitoUser(cognitoUser);
        cognitoUser.authenticateUser(authenticationDetails, {
          newPasswordRequired: (userAttributes, requiredAttributes) => {
              // todo: set the first Signin on the state so that it shows the form to set new password
            // this.props.setFirstSignin(true);
          },
          onFailure: this.onFailure,
          onSuccess: this.onSuccess,
    
    
        });
      }
    
      public submitNewPassword = (e: any) => {
        e.preventDefault();
        const { password, passwordConfirmation } = this.props.firstSignIn;
        if (password !== passwordConfirmation) {
            // remove alert and do something better for feedback
          alert('passwords do not match');
          return;
        }
        if (this.props.firstSignIn.code) {
         
          const user: awsCognito.CognitoUser = this.props.cognito.user;
          user.confirmPassword(this.props.firstSignIn.code, password, {
            onFailure: (error: Error) => {
              console.log(error)
              // todo: remove alerts
            //   alert('invalid code');
            //   this.props.resetState();
            },
            onSuccess: () => {
              this.props.resetState();
            }
          });
          return;
        } else {
          const user: awsCognito.CognitoUser = this.props.cognito.user;
          user.getUserAttributes((attributes) => {
            user.completeNewPasswordChallenge(password, attributes, {
              onFailure: this.onFailure,
              onSuccess: this.onSuccess,
            })
          })
    
        }
    }

    public handleChange(event) {
        const moveTexbox = (document.getElementById('pass') as HTMLElement);
        const usrBtn = (document.getElementById("userBut") as HTMLElement);
        const passBtn = (document.getElementById("passBut") as HTMLElement);
        console.log(event.target.value)
        if (event.target.value === "") {
            usrBtn.style.opacity = "1";
            passBtn.style.opacity = "0";
            moveTexbox.style.marginTop = "0";
        }
    }

    public moveTextBox() {
        const moveTexbox = (document.getElementById('pass') as HTMLElement);
        const usrBtn = (document.getElementById("userBut") as HTMLElement);
        const passBtn = (document.getElementById("passBut") as HTMLElement);
        const userText = (document.getElementById("user") as HTMLInputElement);
        if (userText.value === "") {
            usrBtn.style.opacity = "1";
            passBtn.style.opacity = "0";
            moveTexbox.style.marginTop = "0";
        }
        else {
            moveTexbox.style.marginTop = "35px";
            usrBtn.style.opacity = "0";
            passBtn.style.opacity = "1";
        }

    }

    public enableBut() {
        console.log("here2")
    }

    public render() {

        return (
            <>
                <div className="centered">
                    <div className="form-inline">
                        <div className="frontDiv">
                            <h4 id="titleHead">Sign in to SMS</h4>
                            <input id="user" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.handleChange.bind(this)} />
                            <button onClick={() => this.moveTextBox()} id="userBut"><h6 className="text-muted">Go</h6></button>
                        </div>
                    </div>
                    <div className="form-inline shift">
                        <div className="behindDiv">
                            <div className="box">
                                <input type="password" className="form-control txt-bx" id="pass" placeholder="Password" />
                                <button onClick={() => this.enableBut()} id="passBut"><h6 className="text-muted">Go</h6></button>
                            </div>
                        </div>
                    </div>
                    <div className="rememberDiv">
                        <div className="row">
                            <div className="col-sm-4"><input type="checkbox" id="rememberCheck" /></div>
                            <div className="col-sm-4">
                                <h6 id="h6-rem">Remember Me</h6>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row">
                            <button id="forgotBut">Forgot Username or Password</button>
                    </div>
                </div>
            </>
        );
    }
}

