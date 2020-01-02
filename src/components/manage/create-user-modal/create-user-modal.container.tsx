import { toggleModal, toggleLocationDropdown, updateNewUserLocation, updateNewUser, saveUser, toggleRoleDropdown, toggleCohortDropdown, updateNewUserRole, updateNewUserCohort } from '../../../actions/create-user/create-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { ICreateUserState, IAddressState, IManageCohortsState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateUserModal } from './create-user-modal.component';
import { IAddress } from '../../../model/users/IAddress';
import { IUser } from '../../../model/users/IUser';
import { ICohort } from '../../../model/users/ICohort';

export interface ICreateUserModal {
  toggleModal: () => void,
  toggleLocationDropdown: () => void,
  toggleRoleDropdown: () => void,
  toggleCohortDropdown: () => void,
  createUser: ICreateUserState,
  addresses: IAddressState,
  cohorts: IManageCohortsState,
  saveUser: (user: IUser, cohort?: ICohort) => void,
  updateNewUserLocation: (location: IAddress) => void,
  updateNewUserRole:(role: string, dropwdownRole: string) => void,
  updateNewUserCohort:(cohort: ICohort) => void,
  updateNewUser: (user: IUser) => void,
  updateLocations: () => void
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  createUser: state.managementState.createUser,
  cohorts: state.managementState.manageCohorts,
});

const mapDispatchToProps = {
  saveUser,
  toggleLocationDropdown,
  toggleRoleDropdown,
  toggleCohortDropdown,
  toggleModal,
  updateLocations,
  updateNewUserRole,
  updateNewUserCohort,
  updateNewUser,
  updateNewUserLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);