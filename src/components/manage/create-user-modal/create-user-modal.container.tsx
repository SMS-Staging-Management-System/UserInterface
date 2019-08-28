<<<<<<< HEAD
import { toggleModal, toggleLocationDropdown, updateNewUserLocation, updateNewUser, saveUser, toggleRoleDropdown, toggleCohortDropdown, updateNewUserRole, updateNewUserCohort } from '../../../actions/create-user/create-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { ICreateUserState, IAddressState, IManageCohortsState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateUserModal } from './create-user-modal.component';
import { IAddress } from '../../../model/address.model';
import { IUser } from '../../../model/user.model';
import { ICohort } from '../../../model/cohort';
=======
import { toggleModal, toggleLocationDropdown, updateNewUserLocation, updateNewUser, saveUser } from '../../../actions/create-user/create-user.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { ICreateUserState, IAddressState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateUserModal } from './create-user-modal.component';
import { IUser } from '../../../model/user.model';
import { IAddress } from '../../../model/address.model';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

export interface ICreateUserModal {
  toggleModal: () => void,
  toggleLocationDropdown: () => void,
<<<<<<< HEAD
  toggleRoleDropdown: () => void,
  toggleCohortDropdown: () => void,
  createUser: ICreateUserState,
  addresses: IAddressState,
  cohorts: IManageCohortsState,
  saveUser: (user: IUser, cohort?: ICohort) => void,
  updateNewUserLocation: (location: IAddress) => void,
  updateNewUserRole:(role: string, dropwdownRole: string) => void,
  updateNewUserCohort:(cohort: ICohort) => void,
=======
  createUser: ICreateUserState,
  addresses: IAddressState,
  saveUser: (user: IUser) => void,
  updateNewUserLocation: (location: IAddress) => void,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  updateNewUser: (user: IUser) => void,
  updateLocations: () => void
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
<<<<<<< HEAD
  createUser: state.managementState.createUser,
  cohorts: state.managementState.manageCohorts,
=======
  createUser: state.managementState.createUser
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
});

const mapDispatchToProps = {
  saveUser,
  toggleLocationDropdown,
<<<<<<< HEAD
  toggleRoleDropdown,
  toggleCohortDropdown,
  toggleModal,
  updateLocations,
  updateNewUserRole,
  updateNewUserCohort,
=======
  toggleModal,
  updateLocations,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  updateNewUser,
  updateNewUserLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);