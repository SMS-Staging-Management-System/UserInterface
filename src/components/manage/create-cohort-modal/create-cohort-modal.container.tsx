import { toggleModal, toggleLocationDropdown, updateNewCohortLocation, updateNewCohort, saveCohort, toggleTrainerDropdown, updateNewCohortTrainer } from '../../../actions/create-cohort/create-cohort.actions';
import { manageGetUsersByGroup } from '../../../actions/manage-users/manage-users.actions'
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { IAddressState, ICreateCohortState, IManageUsersState, /*IManageUsersState*/ } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateCohortModal } from './create-cohort-modal.component';
import { ICohort } from '../../../model/users/ICohort';
import { IAddress } from '../../../model/users/IAddress';
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
  manageGetUsersByGroup: (group: string,email: string, page?: number) => void,
  manageUsers: IManageUsersState,
  createCohort: ICreateCohortState,
  addresses: IAddressState,
}

const mapStateToProps = (state:IState) => ({
  addresses: state.managementState.addresses,
  createCohort: state.managementState.createCohort,
  manageUsers: state.managementState.manageUsers
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