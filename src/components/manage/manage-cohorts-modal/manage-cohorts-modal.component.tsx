import * as React from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import { Button, ModalFooter, ModalBody } from 'react-bootstrap';
import { IManageCohortsModalProps } from './manage-cohorts-modal.container';
import { CopyToClipboard} from 'react-copy-to-clipboard';
import Input from 'reactstrap/lib/Input';

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
 * |                                  ______________________________________    |       |    Complete                       [] |
 * |             Join Cohorts Link:  [ "https://{{context}}/management/joincohort/{{token}}"]
 * |____________________________________________________________________________|       | -Staging-                         || |
 * |                                                                            |       |    Staging                        || |
 * |    "Saved"?                         [ "Save" ] [ "Close" | "Cancel" ]      |       |    Bench                          || |
 * |                                                                            |       |    Waiting for Paperwork          \/ |
 * |----------------------------------------------------------------------------/       |______________________________________|
 *                                                                                      
 * NOTE: clicking the remove selected users button should mount a new modal
 * `
 * TODO: set saved text to be based on isSaved
 * TODO: create custom component for handling users statuses
 * TODO: make users selectable
 * TODO: add remove selected users functionality
 */
export class ManageCohortsModal extends React.Component<IManageCohortsModalProps, any> {
    constructor(props:IManageCohortsModalProps) {
        super(props);
    }

    componentDidMount() {
        // set users in the ManageInternalComponent
        // to be the users in this cohort
    }

    saveCohortChanges = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('saving')
        this.props.save(this.props.viewCohort.cohort);
    }

    render() {
        const {viewCohort} = this.props;
        return (
            <Modal isOpen = {viewCohort && viewCohort.modalVisible}>
              <form onSubmit={this.saveCohortChanges}>
                <ModalHeader className="rev-background-color">Cohort info for {viewCohort && viewCohort.cohort.cohortName}</ModalHeader>
                <ModalBody>
                    {/*<ManageInternalComponenent></ManageInternalComponenent>*/}
                    <div className="responsive-modal-row">
                        link: <Input className="horizontal-scroll" disabled value={`${window.location.origin.toString()}/management/joincohort/${viewCohort.cohort.cohortToken}`}></Input>
                        <CopyToClipboard
                           text = {`${window.location.origin.toString()}/management/joincohort/${viewCohort.cohort.cohortToken}`}>
                           <Button>Copy-to-clipboard</Button>
                        </CopyToClipboard>
                    </div>
                </ModalBody>
                <ModalFooter id="manage-Cohort-modal-footer">
                    <div>{viewCohort.isSaved && 'saved'}</div>
                    <Button type="submit"
                      className="rev-btn"
                      disabled = {viewCohort.isSaved}>Save
                    </Button>
                    <Button color="secondary" onClick={this.props.toggleModal}>
                      {viewCohort.isSaved?'Close': 'Cancel'}
                    </Button>
                </ModalFooter>
            </form>
           </Modal>
        );
    }
}