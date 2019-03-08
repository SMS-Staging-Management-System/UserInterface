import { IState } from "../../reducers";
import { connect } from "react-redux";
import { LoginComponent } from "./login.component";
import { setup } from "../../actions/auth/auth.actions";
import { updateUsername, updatePassword, updateConfirmationPassword, updateNewPassword, updateVerificationCode, loginRequest } from "../../actions/login/login.action";

const mapStateToProps = (state: IState) =>({
  login: state.managementState.login
})

const mapDispatchToProps = {
  updateUsername,
  updatePassword,
  updateConfirmationPassword,
  updateNewPassword,
  updateVerificationCode,
  loginRequest,
  setup,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)