import { toggleModal, toggleLocationDropdown, updateNewUserLocation } from '../../../actions/create-user/create-user.actions';
import { IState, ICreateUserState, IAddressState } from '../../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CreateUserModal } from './create-user-modal.component';

export interface ICreateUserModal extends RouteComponentProps<{group: string}>{
  toggleModal,
  toggleLocationDropdown,
  createUser: ICreateUserState,
  addresses: IAddressState,
  saveUser: any,
  updateNewUserLocation
}

const mapStateToProps = (state:IState) => ({
  addresses: state.addresses,
  createUser: state.createUser
});

const mapDispatchToProps = {
  toggleLocationDropdown,
  toggleModal,
  updateNewUserLocation
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);