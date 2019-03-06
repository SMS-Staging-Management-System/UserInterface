import { toggleModal, toggleLocationDropdown, updateNewCohortLocation, updateNewCohort, saveCohort, toggleTrainerDropdown, updateNewCohortTrainer } from '../../../actions/create-cohort/create-cohort.actions';
import { manageGetUsersByGroup } from '../../../actions/manage-users/manage-users.actions'
import { updateLocations } from '../../../actions/address/address.actions';
import { IState,} from '../../../reducers';
import { IAddressState, ICreateCohortState, IManageUsersState } from '../../../reducers/management'
import { connect } from 'react-redux';
import { CreateCohortModal } from './create-cohort-modal.component';

export interface ICreateCohortModal {
  toggleModal,
  toggleLocationDropdown,
  toggleTrainerDropdown,
  createCohort: ICreateCohortState,
  addresses: IAddressState,
  saveCohort,
  updateNewCohortLocation,
  updateNewCohort,
  updateLocations,
  updateNewCohortTrainer,
  manageUsers: IManageUsersState,
  manageGetUsersByGroup

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