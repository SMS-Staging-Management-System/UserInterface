import { ICohort } from '../../../model/cohort';
import { IState } from '../../../reducers';
import { ICohortModalState } from '../../../reducers/management';
import { ManageCohortsModal } from './manage-cohorts-modal.component';
import { connect } from 'react-redux';


export interface IManageCohortsModalProps {
    toggleViewCohortModal: () => void,
    toggleSetStatusDropdown: () => void,
    viewCohort: ICohortModalState,
    saveCohort: (cohort: ICohort) => void,
}

const mapStateToProps = (state: IState):ICohortModalState => {
    return state.managementState.viewCohort
}

// add this stuff to the reducer
const mapDispatchToProps = {
    toggleViewCohortModal: () => {},
    toggleSetStatusDropdown: () => {},
    saveCohort: () => {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsModal);
