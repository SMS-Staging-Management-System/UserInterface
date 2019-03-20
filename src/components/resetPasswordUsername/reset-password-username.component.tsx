import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { IResetPasswordUsernameState } from "../../reducers/management";
interface IResetPasswordUsernameProps extends RouteComponentProps<{}> {
    username: string,
    resetPasswordUsernameProps: IResetPasswordUsernameState, 
    resetPassword: (username: string) => void,
    updateUsername: (username: string) => void,
}
export class ResetPasswordUsernameComponent extends React.Component<IResetPasswordUsernameProps, any> {
    resetPassword = (event) => {
        event.preventDefault();
        this.props.resetPassword(this.props.resetPasswordUsernameProps.username);
      }
      updateUsername = (event) => {
        event.preventDefault();
        this.props.updateUsername(event.target.value)
      }
    render() {
        return (
            <div className="centered shadow-lg p-3 mb-5 bg-white rounded top-lev-div">


                <h4 id="titleHead">Input Email for Password Reset</h4>
                <form id="login-form"  onSubmit={this.resetPassword} >

                    <input name="Email" type="email" className="form-control txt-bx" 
                    placeholder="Email" onChange={this.updateUsername} 
                    value={this.props.resetPasswordUsernameProps.username} />
                    <button className="btn rev-btn" type="submit">Send Email</button>
                    <Link to="/management/reset-password">
                    <button className="btn rev-btn" > Enter Verification Code</button>
                    </Link>
                </form>
            </div>

        )
    }
}
