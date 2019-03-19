import * as React from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import { ModalFooter } from 'react-bootstrap';
import { IManageCohortsModalProps } from './manage-cohorts-modal.container';

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
 * |    | Peter         | Jill         | Complete   |    [ ]    |   [_]   []    |
 * |    | Samantha      | Samson       | Staging    |    [ ]    |   [_]   []    |
 * |    | John          | Jill         | Staging    |    [X]    |   [x]   ||    |
 * |    | John          | Jill         | Bench      |    [ ]    |   [x]   ||    |
 * |    | John          | Jill         | Training   |    [ ]    |   [_]   ||    |
 * |    | John          | Jill         | Staging    |    [ ]    |   [x]   ||    |
 * |    |_______________|______________|____________|___________|_________\/    |
 * |    |------------------------------------------------------------------|    |
 * |                                  ______________________________________    |        ______________________________________
 * |  Set status of selected users:  |___________________________________\/_|   |       |___________________________________\/_| 
 * |                                  ______________________________________    |       | -Training-                        /\ |
 * |         Remove selected users:  [   color=red   text="Remove users"    ]   |       |    Training                       [] |
 * |                                                                            |       |    Complete                       [] |
 * |____________________________________________________________________________|       | -Staging-                         || |
 * |                                                                            |       |    Staging                        || |
 * |    "Saved"?                         [ "Save" ] [ "Close" | "Cancel" ]      |       |    Bench                          || |
 * |                                                                            |       |    Waiting for Paperwork          \/ |
 * |----------------------------------------------------------------------------/       |______________________________________|
 *                                                                                      
 * NOTE: clicking the remove selected users button should mount a new modal
 * `
 */
export class ManageCohortsModal extends React.Component<IManageCohortsModalProps, any> {
    constructor(props:IManageCohortsModalProps) {
        super(props);
    }

    render() {
        const {viewCohort} = this.props;
        return (
            <Modal isOpen = {viewCohort && viewCohort.modalVisible}>
                <ModalHeader className="rev-background-color">Cohort info for {viewCohort && viewCohort.cohort.cohortName}</ModalHeader>
                <ModalFooter id="manage-Cohort-modal-footer">
                </ModalFooter>

           </Modal>
        );
    }
}