import { ICohort } from '../../../model/cohort';
import { IState } from '../../../reducers';
import { ICohortModalState } from '../../../reducers/management';
import { ManageCohortsModal } from './manage-cohorts-modal.component';
import { connect } from 'react-redux';
import { toggleViewCohortModal, getCohortUsers, selectOneUser,
         deselectOneUser, selectAllUsers,
         deselectAllUsers, removeSelectedUsers,
         toggleStatusDropdown, saveCohort,
<<<<<<< HEAD
         updateCohort,
         closeViewCohortModal} from '../../../actions/view-cohort/view-cohort.actions';
=======
         updateCohort} from '../../../actions/view-cohort/view-cohort.actions';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
import { IUser } from '../../../model/user.model';


export interface IManageCohortsModalProps {
    viewCohort: ICohortModalState,
<<<<<<< HEAD
    toggleModal: (cohort: ICohort) => void,
    closeViewCohortModal: () => void,
=======
    toggleModal: () => void,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    save: (cohort: ICohort) => void,
    getUsers: () => void,
    selectOneUser: (user: IUser) => void,
    deselectOneUser: (user: IUser) => void,
<<<<<<< HEAD
=======

>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
}

const mapStateToProps = (state: IState) => {
    return {
        viewCohort: state.managementState.viewCohort
    }
}

// add this stuff to the reducer
const mapDispatchToProps = {
    toggleModal: toggleViewCohortModal,
<<<<<<< HEAD
    closeViewCohortModal: closeViewCohortModal,
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
