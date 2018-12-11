import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';
import {withRouter} from 'react-router';

interface IState {
  username: string,
  password: string,
  confirmationPassword: string,
  newPassword: string,
  isFirstSignin,
  passwordMatch

}

class ResetFirstPasswordComponent extends React.Component<any, IState> {

  constructor(props: any) {
    super(props);
    console.log(props);
    this.state = {
      confirmationPassword: '',
      isFirstSignin: false,
      newPassword: '',
      password: '',
      passwordMatch: false,
      username: '',
    }

    public onSuccess = (result: awsCognito.CognitoUserSession) => {
        const token = result.getIdToken().getJwtToken();
        localStorage.setItem('token', token);
        // console.log(userPool.getCurrentUser());
        // console.log(result.getIdToken().decodePayload())
        // const idtok: any = result.getIdToken();
        // console.log(idtok.payload['cognito:groups']) //payload has the user info on it

        // navigate pages now that we have successfully logged in
        console.log("NAVIGATE TO NEW PAGE")
        this.props.history.push('/register');
    }
  }

  public submitNewPassword = (e: any) => {
    e.preventDefault()
    const { password, confirmationPassword } = this.state;
    if (password !== confirmationPassword) {
      this.setState({
        ...this.state,
        passwordMatch: true
      })
      return;
    }
    if (this.props.code) {
      const cognitoUser: awsCognito.CognitoUser = this.props.cognitUser;
      cognitoUser.updateAttributes([], (err, result) => console.log);

      // Get these details and call
      cognitoUser.completeNewPasswordChallenge(password, [], this);
      // const user: awsCognito.CognitoUser = this.props.cognitUser;
      // user.updateAttributes([], (err, result) => console.log);
      // user.confirmPassword(this.props.code, password, {
      //   onFailure: (error: Error) => {
      //     console.log(error)
      //     // todo: remove alerts
      //     //   alert('invalid code');
      //     //   this.props.resetState();
      //   },
      //   onSuccess: () => {
      //     this.props.resetState();
      //   }
      // });
      return;
    } else {
      const user: awsCognito.CognitoUser = this.props.cognito.user;
      user.getUserAttributes((attributes) => {
        user.completeNewPasswordChallenge(password, attributes, {
          onFailure: this.onFailure,
          onSuccess: this.onSuccess,
        })
      })

    public submitNewPassword = (e: any) => {
        e.preventDefault()
        const { password, confirmationPassword } = this.state;
        if (password !== confirmationPassword) {
            this.setState({
                ...this.state,
                passwordMatch: true
            })
            return;
        }
        if (this.props.code) {
            const cognitoUser: awsCognito.CognitoUser = this.props.cognitUser;
            cognitoUser.updateAttributes([], (err, result) => console.log);

            // Get these details and call
            cognitoUser.completeNewPasswordChallenge(password, cognitoUser.getUserAttributes, this);
            // const user: awsCognito.CognitoUser = this.props.cognitUser;
            // user.updateAttributes([], (err, result) => console.log);
            // user.confirmPassword(this.props.code, password, {
            //     onFailure: (error: Error) => {
            //         console.log(error)
            //         // todo: remove alerts
            //         //   alert('invalid code');
            //         //   this.props.resetState();
            //     },
            //     onSuccess: () => {
            //         this.props.resetState();
            //     }
            // });
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
  }
  public handlePassChange(event) {
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  public handleChange(event) {
    const confPassBox = (document.getElementById('conf-pass') as HTMLElement);
    const newPassBtn = (document.getElementById("newPassBut") as HTMLElement);
    const confPassBtn = (document.getElementById("confPassBut") as HTMLElement);
    // console.log(event.target.value)
    if (event.target.value === "") {
      newPassBtn.style.opacity = "1";
      confPassBtn.style.opacity = "0";
      confPassBox.style.marginTop = "0";
    }
    this.setState({
      ...this.state,
      confirmationPassword: event.target.value
    })
  }

  public moveTextBox = (e: any) => {
    e.preventDefault();
    const moveConfPassBox = (document.getElementById('conf-pass') as HTMLElement);
    const newPassBtn = (document.getElementById("newPassBut") as HTMLElement);
    const confPassBtn = (document.getElementById("confPassBut") as HTMLElement);
    const userText = (document.getElementById("new-pass") as HTMLInputElement);
    if (userText.value === "") {
      newPassBtn.style.opacity = "1";
      confPassBtn.style.opacity = "0";
      moveConfPassBox.style.marginTop = "0";
    }
    else {
      moveConfPassBox.style.marginTop = "35px";
      newPassBtn.style.opacity = "0";
      confPassBtn.style.opacity = "1";
    }

    public render() {
        return (
            <>
                <div className="shadow-lg p-3 mb-5 bg-white rounded top-lev-div">
                    <>
                        <h4 id="titleHead">Reset Password</h4>
                        <form className="form-inline" onSubmit={this.moveTextBox}>
                            <div className="frontDiv">

                                <input id="new-pass" type="password" className="form-control txt-bx" placeholder="New Password" onChange={this.handleChange.bind(this)} />
                                <button id="newPassBut"><h6 className="text-muted">Go</h6></button>
                            </div>
                        </form>
                        <form className="form-inline shift" onSubmit={this.submitNewPassword}>
                            <div className="behindDiv">
                                <div className="box">
                                    <input type="password" className="form-control txt-bx" id="conf-pass" placeholder="Confirm Password" onChange={this.handlePassChange.bind(this)} />
                                    <button id="confPassBut"><h6 className="text-muted">Go</h6></button>
                                </div>
                            </div>
                        </form>
                        {this.state.passwordMatch &&
                            <h6 id="invalidCredHead">Password fields do not match</h6>
                        }

                    </>

                </div>
            </>
        );
    }
}

export default withRouter(ResetFirstPasswordComponent)