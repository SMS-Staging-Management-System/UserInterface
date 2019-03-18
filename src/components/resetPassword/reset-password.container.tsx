import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ResetPasswordComponent } from "./reset-password.component";
import { loginRequest } from "../../actions/login/login.action";
import { updateVerificationCode, updateConfirmationPassword, updateNewPassword, submitPasswordReset, resetPassword } from "../../actions/reset-password/reset-password.actions";


const mapStateToProps = (state: IState, ownProps) =>({
  login: state.managementState.login,
  history: ownProps.history,
  location: ownProps.location,
  match: ownProps.match,
})

const mapDispatchToProps = {
  loginRequest,
  updateVerificationCode,
  updateConfirmationPassword,
  updateNewPassword,
  submitPasswordReset,
  resetPassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent)