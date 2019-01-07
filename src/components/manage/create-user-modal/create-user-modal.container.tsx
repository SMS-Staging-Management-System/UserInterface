import { toggleModal, toggleLocationDropdown } from '../../../actions/create-user/create-user.actions';
import { IState, ICreateUserState } from '../../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CreateUserModal } from './create-user-modal.component';

export interface ICreateUserModal extends RouteComponentProps<{group: string}>{
  toggleModal,
  toggleLocationDropdown,
  createUser: ICreateUserState,
  newUser: any,
  saveUser: any
}

const mapStateToProps = (state:IState) => ({
  createUser: state.createUser
});

const mapDispatchToProps = {
  toggleLocationDropdown,
  toggleModal
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);