import { toggleViewUserModal, viewUserLocation, viewUserInfo } from '../../../actions/view-user/view-user.actions';
import { IState,} from '../../../reducers';
import { IViewUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { ViewUserModal } from './view-user-modal.component';

export interface IViewUserModal {
  toggleViewUserModal,
  viewUser: IViewUserState,
  addresses: IAddressState,
  viewUserLocation,
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  viewUser: state.managementState.viewUser
});

const mapDispatchToProps = {
  toggleViewUserModal,
  viewUserInfo,
  viewUserLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal);