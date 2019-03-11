import { toggleViewUserModal, updateUserInfo, hoveredUser } from '../../../actions/view-user/view-user.actions';
import { IState } from '../../../reducers';
import { IViewUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { ViewUserModal } from './view-user-modal.component';
import { IUser } from '../../../model/user.model';

export interface IViewUserModal {
  toggleViewUserModal,
  viewUser: IViewUserState,
  addresses: IAddressState,
  user: IUser

}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  viewUser: state.managementState.viewUser,
  user: state.managementState.currentSMSUser.currentSMSUser,

});

const mapDispatchToProps = {
  toggleViewUserModal,
  updateUserInfo,
  hoveredUser
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal);