import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ManageCohortsComponenent } from './manage-cohorts.component';
import { ICohort } from '../../../model/cohort';
import { updateCohorts} from '../../../actions/manage-cohorts/manage-cohorts.actions'

import * as createCohortActions from '../../../actions/create-cohort/create-cohort.actions';
import * as viewCohortActions from '../../../actions/view-cohort/view-cohort.actions';


/**
 * This is the table that holds the cohorts 
 * That are being managed by the manage component
 */

export interface IManageCohortsComponentProps {
  cohorts: ICohort[];
  updateCohorts: (cohorts: ICohort[]) => void;
  toggleCreateCohortModal: () => void;
  toggleViewCohortModal: () => void;
  /**
   * Handles what happens when a cohort is hovered
   * 
   * @param cohort: The cohort that is currently being hovered
   */
  hoveredCohort: (cohorts: ICohort)  => void;
}

const mapStateToProps= ( state: IState) => {
    return {
        cohorts: state.managementState.manageCohorts.cohorts
    }
}

const mapDispatchToProps =  {
        toggleCreateCohortModal: createCohortActions.toggleModal,
        toggleViewCohortModal: viewCohortActions.toggleViewCohortModal,
        hoveredCohort: viewCohortActions.hoveredCohort,
        updateCohorts
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsComponenent)