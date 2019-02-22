import { toggleModal, toggleLocationDropdown, updateNewCohortLocation, updateNewCohort, saveCohort } from '../../../actions/create-cohort/create-cohort.actions';
import { updateLocations } from '../../../actions/address/address.actions';
import { IState, IAddressState, ICreateCohortState } from '../../../reducers';
import { connect } from 'react-redux';
import { CreateCohortModal } from './create-cohort-modal.component';

export interface ICreateCohortModal {
  toggleModal,
  toggleLocationDropdown,
  createCohort: ICreateCohortState,
  addresses: IAddressState,
  saveCohort,
  updateNewCohortLocation,
  updateNewCohort,
  updateLocations
}

const mapStateToProps = (state:IState) => ({
  addresses: state.addresses,
  createCohort: state.createCohort
});

const mapDispatchToProps = {
  saveCohort,
  toggleLocationDropdown,
  toggleModal,
  updateLocations,
  updateNewCohort,
  updateNewCohortLocation,
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateCohortModal);