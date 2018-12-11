import * as React from 'react';
import * as awsCognito from 'amazon-cognito-identity-js';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import ResetFirstPasswordComponent from '../resetFirstPassword/reset-first-password.component';
import * as userActions from '../../actions/user/user.actions';

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
    login: (username: string, password: string) => { void },
    setup: () => { void },
    isFirstSignin: boolean,
    cogUser: any
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

        // console.log(userPool.getCurrentUser());
        // console.log(result.getIdToken().decodePayload())
        // const idtok: any = result.getIdToken();
        // console.log(idtok.payload['cognito:groups']) //payload has the user info on it

        // navigate pages now that we have successfully logged in
        console.log("NAVIGATE TO NEW PAGE")

        // Call setup whenevr yo are ready for the app to go away from login page
        this.props.setup();
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
        this.props.login(username, password);
    }

    public handlePassChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    public handleChange(event) {
        const movePassBox = (document.getElementById('pass') as HTMLElement);
        const usrBtn = (document.getElementById("userBut") as HTMLElement);
        const passBtn = (document.getElementById("passBut") as HTMLElement);
        // console.log(event.target.value)
        if (event.target.value === "") {
            usrBtn.style.opacity = "1";
            passBtn.style.opacity = "0";
            movePassBox.style.marginTop = "0";
        }
        this.setState({
            ...this.state,
            username: event.target.value
        })
    }

    public moveTextBox = (e: any) => {
        e.preventDefault();
        const movePassBox = (document.getElementById('pass') as HTMLElement);
        const usrBtn = (document.getElementById("userBut") as HTMLElement);
        const passBtn = (document.getElementById("passBut") as HTMLElement);
        const userText = (document.getElementById("user") as HTMLInputElement);
        if (userText.value === "") {
            usrBtn.style.opacity = "1";
            passBtn.style.opacity = "0";
            movePassBox.style.marginTop = "0";
        }
        else {
            movePassBox.style.marginTop = "35px";
            usrBtn.style.opacity = "0";
            passBtn.style.opacity = "1";
        }

    }

    public render() {
        console.log(this.props.cogUser);
        return (
            <>
                {!this.props.isFirstSignin &&
                    <>
                        <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">

                            <h4 id="titleHead">Sign in to SMS</h4>
                            <form className="form-inline" onSubmit={this.moveTextBox}>
                                <div className="frontDiv">
                                    <input id="user" type="text" className="form-control txt-bx" placeholder="Username" onChange={this.handleChange.bind(this)} />
                                    <button id="userBut"><h6 className="text-muted">Go</h6></button>
                                </div>
                            </form>
                            <form className="form-inline shift" onSubmit={this.submit}>
                                <div className="behindDiv">
                                    <div className="box">
                                        <input type="password" className="form-control txt-bx" id="pass" placeholder="Password" onChange={this.handlePassChange.bind(this)} />
                                        <button id="passBut"><h6 className="text-muted">Go</h6></button>
                                    </div>
                                </div>
                            </form>

                            {this.state.incorrectUserPass &&
                                <h6 id="invalidCredHead">Invalid Credentials</h6>
                            }
                            <div className="rememberDiv">
                                <div className="row">
                                    <div className="col-sm-4"><input type="checkbox" id="rememberCheck" /></div>
                                    <div className="col-sm-4">
                                        <h6 id="h6-rem">Remember Me</h6>
                                    </div>
                                </div>

                            </div>
                            <div className="row resetDiv">
                                <button id="forgotBut">Forgot Username or Password</button>
                            </div>



                        </div>
                       
                    </>
                
                }
                
                {this.props.isFirstSignin &&
                    <ResetFirstPasswordComponent
                        cognitUser={this.props.cogUser}
                        code={this.state.password} />
                }
            </>
        );
    }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {
    ...userActions
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)