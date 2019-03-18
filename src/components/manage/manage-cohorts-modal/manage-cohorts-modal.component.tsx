import * as React from 'react';
import Modal from 'reactstrap/lib/Modal';
import { ICohort } from '../../../model/cohort';
import { IUser } from '../../../model/user.model';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import { IStatus } from '../../../model/status.model';
import { ModalFooter } from 'react-bootstrap';

//move this to reducers
export interface ICohortModalState {
    /**
     * The currently selected cohort
     */
    cohort: ICohort,
    /**
     * List of users in the cohort
     * that are currently selected for
     * changes
     */
    selectedUsers: IUser[],
    /**
     * The status that we would like to
     * change all of the selected users to.
     */
    selectedStatus: IStatus;
    /**
     * Whether the modal is visible or not.
     */
    modalVisible: boolean;
    /**
     * Whether the modal is in the 'saved' state or not
     */
    isSaved: boolean;
}

// move this to ManageCohortsModal.container.tsx
export interface IManageCohortsModal {
    toggleViewCohortModal: () => void,
    viewCohort: ICohortModalState
}


/**
 * `
 * /----------------------------------------------------------------------------\
 * |                              Cohort Info                                X  |
 * |----------------------------------------------------------------------------|
 * |                                                                            |
 * |    |------------------------------------------------------------------|    |
 * |    | First name  v | Last name  v | Status   v | Virtual v | all [ ]  |    |
 * |    |---------------|--------------|------------|-----------|----------|    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [x]   /\    |
 * |    | Peter         | Jill         | Staging    |    [ ]    |   [_]   []    |
 * |    | Samantha      | Samson       | Staging    |    [ ]    |   [_]   []    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [x]   ||    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [x]   ||    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [_]   ||    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [x]   ||    |
 * |    |_______________|______________|____________|___________|_________\/    |
 * |    |------------------------------------------------------------------|    |
 * |                                  ______________________________________    |        ______________________________________
 * |                    Set status:  |___________________________________\/_|   |       |___________________________________\/_| 
 * |                                                                            |       | -Training-                        /\ |
 * |                                                    ____________________    |       |    Training                       [] |
 * |    "Saved"?                                       [ "Close" | "Cancel" ]   |       |    Complete                       [] |
 * |                                                                            |       | -Staging-                         || |
 * |----------------------------------------------------------------------------/       |    Staging                        || |
 *                                                                                      |    Bench                          || |
 *                                                                                      |    Waiting for Paperwork          \/ |
 *                                                                                      |______________________________________|
 * `
 */
export class ManageCohortsModal extends React.Component<IManageCohortsModal, any> {
    constructor(props:IManageCohortsModal) {
        super(props);
    }

    render() {
        const {viewCohort} = this.props;
        return (
            <Modal isOpen = {true}>
                <ModalHeader className="rev-background-color">Cohort info for {viewCohort.cohort.cohortName}</ModalHeader>
                <ModalFooter id="manage-Cohort-modal-footer">

                </ModalFooter>

           </Modal>
        );
    }
}