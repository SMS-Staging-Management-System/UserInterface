import { ICognitoUser } from '../../../model/cognito-user.model';
import { connect } from 'react-redux';
import { ManageInternalComponenet } from './manage-internal.component';
import { IState } from '../../../reducers';
import { toggleViewUserModal, hoveredUser} from "../../../actions/view-user/view-user.actions"

export interface IManageInternalComponentProps {
  manageUsers: ICognitoUser[];
}

const mapStateToProps= ( state: IState) => {
  return {
      manageUsers: state.managementState.manageUsers.manageUsers
  }
}

const mapDispatchToProps= {
    toggleViewUserModal: toggleViewUserModal,
    hoveredUser: hoveredUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInternalComponenet)
