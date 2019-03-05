import { toggleModal, toggleLocationDropdown, updateNewUserLocation, updateNewUser, saveUser } from '../../../actions/create-user/create-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { ICreateUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateUserModal } from './create-user-modal.component';

export interface ICreateUserModal {
  toggleModal,
  toggleLocationDropdown,
  createUser: ICreateUserState,
  addresses: IAddressState,
  saveUser,
  updateNewUserLocation,
  updateNewUser,
  updateLocations
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  createUser: state.managementState.createUser
});

const mapDispatchToProps = {
  saveUser,
  toggleLocationDropdown,
  toggleModal,
  updateLocations,
  updateNewUser,
  updateNewUserLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);