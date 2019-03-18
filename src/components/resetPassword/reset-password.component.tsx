
import PopoverBody from "reactstrap/lib/PopoverBody";
import PopoverHeader from "reactstrap/lib/PopoverHeader";
import Popover from "reactstrap/lib/Popover";

import { RouteComponentProps, /* Route  */ } from 'react-router';
import React from "react";
import { ILoginState } from "../../reducers/management";
import { ICognitoUser } from "../../model/cognito-user.model";


interface IResetPasswordProps extends RouteComponentProps<{}> {
    login: ILoginState,
    updateConfirmationPassword: (confirmationPassword: string) => void,
    updateNewPassword: (newPassword: string) => void,
    submitPasswordReset: (needsVerificationCode: boolean, username: string, verificationCode: string, newPassword: string, history, cogUser: ICognitoUser) => void,
    updateVerificationCode: (verificationCode: string) => void,
    //submitLogin: () => void,
    // setup: () => void,
    togglePasswordTip: () => void,
    resetPassword: (username: string) => void,


}
export class ResetPasswordComponent extends React.Component<IResetPasswordProps, any> {

    constructor(props) {
        super(props);
    }
    updateNewPassword = (event: any) => {
        event.preventDefault();
        this.props.updateNewPassword(event.target.value);
    }
    updateVerificationCode = (event: any) => {
        event.preventDefault();
        this.props.updateVerificationCode(event.target.value);
    }
    updateConfirmationPassword = (event: any) => {
        event.preventDefault();
        this.props.updateConfirmationPassword(event.target.value);
    }
    submitPasswordReset = (event) => {
        event.preventDefault();
        if (this.props.login.newPassword === this.props.login.confirmationPassword) {
            // You need to get the new password and required attributes from the UI inputs
            // and then trigger the following function with a button click
            // For example, the email and phone_number are required attributes
            this.props.submitPasswordReset(this.props.login.needsVerificationCode, this.props.login.username,
                this.props.login.verificationCode, this.props.login.newPassword, this.props.history, this.props.login.cogUser)
        }
    }


    resetPassword = (event) => {
        event.preventDefault();
        this.props.resetPassword(this.props.login.username);
    }

    togglePasswordTip = () => {
        this.setState({
            showPasswordTip: !this.state.showPasswordTip,
        });
    }
    render() {
        <>
            <div>


                <h4 id="titleHead">Reset Password</h4>
                <form id="login-form" onSubmit={this.submitPasswordReset}>
                    {this.props.login.needsVerificationCode &&
                        <input name="verification-code" type="text" className="form-control txt-bx" placeholder="Verification Code" onChange={this.updateVerificationCode} value={this.props.login.verificationCode} />
                    }

                    <input id="new-password-input" name="password" type="password" className="form-control txt-bx" placeholder="New Password" onMouseLeave={this.togglePasswordTip} onMouseEnter={this.togglePasswordTip} onChange={this.updateNewPassword} value={this.props.login.newPassword}
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\^$*.[\]{}()?\-!@#%&/,><':;|_~`]).{8,99}" required />

                    <Popover placement="bottom" isOpen={this.props.login.showPasswordTip} target="new-password-input" toggle={this.togglePasswordTip}>
                        <PopoverHeader>Password Requirements</PopoverHeader>
                        <PopoverBody>Password must be at least 8 characters, have 1 special character, 1 number, 1 uppercase letter, and 1 lower case number</PopoverBody>
                    </Popover>



                    <input name="new-password" id="login-pass" type="password" className="form-control txt-bx" placeholder="Confirm Password" onChange={this.updateConfirmationPassword} value={this.props.login.confirmationPassword} />
                    <button className="btn rev-btn">Reset</button>

                </form>
            </div>
        </>
        return null
    }

}
