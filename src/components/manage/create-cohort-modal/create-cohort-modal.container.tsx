import { toggleModal, toggleLocationDropdown, updateNewCohortLocation, updateNewCohort, saveCohort, toggleTrainerDropdown, updateNewCohortTrainer } from '../../../actions/create-cohort/create-cohort.actions';
import { manageGetUsersByGroup } from '../../../actions/manage-users/manage-users.actions'
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
<<<<<<< HEAD
import { IAddressState, ICreateCohortState, /*IManageUsersState*/ } from '../../../reducers/management'
=======
import { IAddressState, ICreateCohortState, IManageUsersState } from '../../../reducers/management'
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { connect } from 'react-redux';
import { CreateCohortModal } from './create-cohort-modal.component';
import { ICohort } from '../../../model/cohort';
import { IAddress } from '../../../model/address.model';
import { ICognitoUser } from '../../../model/cognito-user.model';

export interface ICreateCohortModal {
  toggleModal: () => void,
  toggleLocationDropdown: () => void,
  toggleTrainerDropdown: () => void,
  saveCohort: (cohort: ICohort) => void,
  updateNewCohortLocation: (location: IAddress) => void,
  updateNewCohort: (cohort: ICohort) => void,
  updateLocations: () => void,
  updateNewCohortTrainer: (trainer: ICognitoUser) => void,
  manageGetUsersByGroup: (group: string) => void,

<<<<<<< HEAD
  //manageUsers: IManageUsersState,
=======
  manageUsers: IManageUsersState,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  createCohort: ICreateCohortState,
  addresses: IAddressState,
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  createCohort: state.managementState.createCohort,
<<<<<<< HEAD
  //manageUsers: state.managementState.manageUsers
=======
  manageUsers: state.managementState.manageUsers
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
});

const mapDispatchToProps = {
  saveCohort,
  toggleLocationDropdown,
  toggleTrainerDropdown,
  toggleModal,
  updateLocations,
  updateNewCohort,
  updateNewCohortTrainer,
  updateNewCohortLocation,
  manageGetUsersByGroup
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCohortModal);