import { toggleModal, viewUserLocation, viewUser } from '../../../actions/view-user/view-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { IViewUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { ViewUserModal } from './view-user-modal.component';

export interface IViewUserModal {
  toggleModal,
  viewUser: IViewUserState,
  addresses: IAddressState,
  saveUser,
  updateNewUserLocation,
  updateNewUser,
  updateLocations
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  viewUser: state.managementState.viewUser
});

const mapDispatchToProps = {
  toggleModal,
  updateLocations,
  viewUser,
  viewUserLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewUserModal);