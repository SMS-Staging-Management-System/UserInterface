import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ResetPasswordComponent } from "./reset-password.component";
import { loginRequest } from "../../actions/login/login.action";
import { updateVerificationCode, updateConfirmationPassword, updateNewPassword, submitPasswordReset, togglePasswordTip } from "../../actions/reset-password/reset-password.actions";


const mapStateToProps = (state: IState, ownProps) =>({
  history: ownProps.history,
  location: ownProps.location,
  match: ownProps.match,
  resetPasswordProps: state.managementState.resetPassword,
  resetPasswordUsernameProps: state.managementState.resetPasswordUsername,
})

const mapDispatchToProps = {
  loginRequest,
  updateVerificationCode,
  updateConfirmationPassword,
  updateNewPassword,
  submitPasswordReset,
  togglePasswordTip,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent)