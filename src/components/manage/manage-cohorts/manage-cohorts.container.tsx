import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { ManageCohortsComponenent } from './manage-cohorts.component';
import { ICohort } from '../../../model/cohort';
import { updateCohorts} from '../../../actions/manage-cohorts/manage-cohorts.actions'

import * as createCohortActions from '../../../actions/create-cohort/create-cohort.actions';


/**
 * This is the table that holds the cohorts 
 * That are being managed by the manage component
 */

export interface IManageCohortsComponentProps {
  cohorts: ICohort[];
  toggleCreateCohortModal: () => void;
  updateCohorts : (cohorts: ICohort[])  => void;
}

const mapStateToProps= ( state: IState) => {
    return {
        cohorts: state.managementState.manageCohorts.cohorts
    }
}

const mapDispatchToProps =  {
        updateCohorts,
        toggleCreateCohortModal: createCohortActions.toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsComponenent)