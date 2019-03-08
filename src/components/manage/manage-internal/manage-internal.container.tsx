import { ManageInternalComponenet } from "./manage-internal.component";
import { IState } from "../../../reducers";
import { connect } from 'react-redux';
import { toggleViewUserModal, hoveredUser} from "../../../actions/view-user/view-user.actions"


const mapStateToProps = (state:IState) => ({
    manageUsers: state.managementState.manageUsers.manageUsers,
  });

  const mapDispatchToProps = {
    toggleViewUserModal: toggleViewUserModal,
    hoveredUser: hoveredUser
  }


export default connect(mapStateToProps, mapDispatchToProps)(ManageInternalComponenet);