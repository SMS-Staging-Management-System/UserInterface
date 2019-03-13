import { toggleModal, toggleLocationDropdown, updateNewUserLocation, updateNewUser, saveUser } from '../../../actions/create-user/create-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { ICreateUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateUserModal } from './create-user-modal.component';
import { IUser } from '../../../model/user.model';
import { IAddress } from '../../../model/address.model';

export interface ICreateUserModal {
  toggleModal: () => void,
  toggleLocationDropdown: () => void,
  createUser: ICreateUserState,
  addresses: IAddressState,
  saveUser: (user: IUser) => void,
  updateNewUserLocation: (location: IAddress) => void,
  updateNewUser: (user: IUser) => void,
  updateLocations: () => void
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