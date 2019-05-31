import { IState } from "../../reducers";
import { connect } from "react-redux";
import { ResetPasswordUsernameComponent } from "./reset-password-username.component";
import { updateUsername, resetPassword } from "../../actions/resetPasswordUsername/reset-password-username.actions";

const mapStateToProps = (state: IState, ownProps) =>({
    history: ownProps.history,
    location: ownProps.location,
    match: ownProps.match,
    resetPasswordUsernameProps: state.managementState.resetPasswordUsername,

  })
  
  const mapDispatchToProps = {
    updateUsername,
    resetPassword,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordUsernameComponent)