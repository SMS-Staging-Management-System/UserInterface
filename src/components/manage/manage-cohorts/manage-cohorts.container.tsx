import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ManageCohortsComponenent } from './manage-cohorts.component';
import { ICohort } from '../../../model/cohort';
<<<<<<< HEAD
import { updateCohorts, updateCohortsByPage} from '../../../actions/manage-cohorts/manage-cohorts.actions'
=======
import { updateCohorts} from '../../../actions/manage-cohorts/manage-cohorts.actions'
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

import * as createCohortActions from '../../../actions/create-cohort/create-cohort.actions';
import * as viewCohortActions from '../../../actions/view-cohort/view-cohort.actions';


/**
 * This is the table that holds the cohorts 
 * That are being managed by the manage component
 */

export interface IManageCohortsComponentProps {
  cohorts: ICohort[];
<<<<<<< HEAD
  currentPage: number;
  totalPages: number;
  updateCohorts: (cohorts: ICohort[]) => void;
  updateCohortsByPage: (cohortsPage, currentPage: number) => void;
  toggleCreateCohortModal: () => void;
  toggleViewCohortModal: (cohort: ICohort) => void;
=======
  updateCohorts: (cohorts: ICohort[]) => void;
  toggleCreateCohortModal: () => void;
  toggleViewCohortModal: () => void;
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  /**
   * Handles what happens when a cohort is hovered
   * 
   * @param cohort: The cohort that is currently being hovered
   */
  hoveredCohort: (cohorts: ICohort)  => void;
}

const mapStateToProps= ( state: IState) => {
<<<<<<< HEAD
    console.log(state.managementState.manageCohorts);
    return {
        cohorts: state.managementState.manageCohorts.cohorts,
        currentPage: state.managementState.manageCohorts.currentPage,
        totalPages: state.managementState.manageCohorts.totalPages
=======
    return {
        cohorts: state.managementState.manageCohorts.cohorts
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    }
}

const mapDispatchToProps =  {
        toggleCreateCohortModal: createCohortActions.toggleModal,
        toggleViewCohortModal: viewCohortActions.toggleViewCohortModal,
        hoveredCohort: viewCohortActions.hoveredCohort,
<<<<<<< HEAD
        updateCohorts: updateCohorts,
        updateCohortsByPage: updateCohortsByPage
=======
        updateCohorts
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsComponenent)