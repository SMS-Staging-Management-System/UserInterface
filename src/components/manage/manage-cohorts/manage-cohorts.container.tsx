import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ManageCohortsComponenent } from './manage-cohorts.component';
import { ICohort } from '../../../model/cohort';
import { updateCohorts, updateCohortsByPage} from '../../../actions/manage-cohorts/manage-cohorts.actions'
import * as createCohortActions from '../../../actions/create-cohort/create-cohort.actions';
import * as viewCohortActions from '../../../actions/view-cohort/view-cohort.actions';


/**
 * This is the table that holds the cohorts 
 * That are being managed by the manage component
 */

export interface IManageCohortsComponentProps {
  cohorts: ICohort[];
  currentPage: number;
  totalPages: number;
  updateCohorts: (cohorts: ICohort[]) => void;
  updateCohortsByPage: (cohortsPage, currentPage: number) => void;
  toggleCreateCohortModal: () => void;
  toggleViewCohortModal: (cohort: ICohort) => void;
  /**
   * Handles what happens when a cohort is hovered
   * 
   * @param cohort: The cohort that is currently being hovered
   */
  hoveredCohort: (cohorts: ICohort)  => void;
}

const mapStateToProps= ( state: IState) => {
    console.log(state.managementState.manageCohorts);
    return {
        cohorts: state.managementState.manageCohorts.cohorts,
        currentPage: state.managementState.manageCohorts.currentPage,
        totalPages: state.managementState.manageCohorts.totalPages
    }
}

const mapDispatchToProps =  {
        toggleCreateCohortModal: createCohortActions.toggleModal,
        toggleViewCohortModal: viewCohortActions.toggleViewCohortModal,
        hoveredCohort: viewCohortActions.hoveredCohort,
        updateCohorts: updateCohorts,
        updateCohortsByPage: updateCohortsByPage
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsComponenent)