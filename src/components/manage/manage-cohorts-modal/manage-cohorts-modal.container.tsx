import { ICohort } from '../../../model/cohort';
import { IState } from '../../../reducers';
import { ICohortModalState } from '../../../reducers/management';
import { ManageCohortsModal } from './manage-cohorts-modal.component';
import { connect } from 'react-redux';
import { toggleViewCohortModal, getCohortUsers, selectOneUser,
         deselectOneUser, selectAllUsers,
         deselectAllUsers, removeSelectedUsers,
         toggleStatusDropdown, saveCohort,
         updateCohort,
         closeViewCohortModal} from '../../../actions/view-cohort/view-cohort.actions';
import { IUser } from '../../../model/user.model';


export interface IManageCohortsModalProps {
    viewCohort: ICohortModalState,
    toggleModal: (cohort: ICohort) => void,
    closeViewCohortModal: () => void,
    save: (cohort: ICohort) => void,
    getUsers: () => void,
    selectOneUser: (user: IUser) => void,
    deselectOneUser: (user: IUser) => void,
}

const mapStateToProps = (state: IState) => {
    return {
        viewCohort: state.managementState.viewCohort
    }
}

// add this stuff to the reducer
const mapDispatchToProps = {
    toggleModal: toggleViewCohortModal,
    closeViewCohortModal: closeViewCohortModal,
    save: saveCohort,
    getUsers: getCohortUsers,
    selectOneUser,
    deselectOneUser,
    selectAllUsers,
    deselectAllUsers,
    removeSelectedUsers,
    toggleStatusDropdown,
    update: updateCohort
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCohortsModal);
