import { IState } from "../../reducers";
import { connect } from "react-redux";
import { LoginComponent } from "./login.component";
import { setup } from "../../actions/auth/auth.actions";
import { updateUsername, updatePassword, updateConfirmationPassword, updateNewPassword, updateVerificationCode, loginRequest} from "../../actions/login/login.action";

const mapStateToProps = (state: IState, ownProps) =>({
  login: state.managementState.login,
  history: ownProps.history,
  location: ownProps.location,
  match: ownProps.match
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