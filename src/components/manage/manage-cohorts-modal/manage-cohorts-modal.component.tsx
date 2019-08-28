import * as React from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
<<<<<<< HEAD
import { ModalFooter, ModalBody } from 'react-bootstrap';
import { Table, Input, Button } from 'reactstrap';
import { IManageCohortsModalProps } from './manage-cohorts-modal.container';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IUser } from '../../../model/user.model';
=======
import { Button, ModalFooter, ModalBody } from 'react-bootstrap';
import { IManageCohortsModalProps } from './manage-cohorts-modal.container';
import { CopyToClipboard} from 'react-copy-to-clipboard';
import Input from 'reactstrap/lib/Input';
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

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
<<<<<<< HEAD
interface ManageCohortsModalState {
    userList: IUser[]
}


export class ManageCohortsModal extends React.Component<IManageCohortsModalProps, ManageCohortsModalState> {
    constructor(props: IManageCohortsModalProps) {
        super(props);
        this.state = {
            userList: []
        };
=======
export class ManageCohortsModal extends React.Component<IManageCohortsModalProps, any> {
    constructor(props:IManageCohortsModalProps) {
        super(props);
    }

    componentDidMount() {
        // set users in the ManageInternalComponent
        // to be the users in this cohort
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    }

    saveCohortChanges = (e: React.FormEvent) => {
        e.preventDefault();
<<<<<<< HEAD
        console.log('saving cohort')
=======
        console.log('saving')
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        this.props.save(this.props.viewCohort.cohort);
    }

    render() {
<<<<<<< HEAD
        console.log(this.props.viewCohort.cohort.users)
        const { viewCohort } = this.props;
        return (
            <Modal isOpen={viewCohort && viewCohort.modalVisible}>
                <form onSubmit={this.saveCohortChanges}>
                    <ModalHeader className="rev-background-color">Cohort info for {viewCohort && viewCohort.cohort.cohortName}</ModalHeader>
                    <ModalBody>
                        {/*<ManageInternalComponenent></ManageInternalComponenent>*/}
                        <div className="responsive-modal-row">
                            link: <Input className="horizontal-scroll" disabled value={`${window.location.origin.toString()}/management/joincohort/${viewCohort.cohort.cohortToken}`}></Input>
                            <CopyToClipboard
                                text={`${window.location.origin.toString()}/management/joincohort/${viewCohort.cohort.cohortToken}`}>
                                <Button>Copy-to-clipboard</Button>
                            </CopyToClipboard>
                        </div>
                        <div>
                            <Table>
                                <thead className="rev-background-color">
                                    <tr>
                                        <th className="pointer-table" >First Name</th>
                                        <th className="pointer-table" >Last Name</th>
                                        <th className="pointer-table" >Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewCohort.cohort.users && viewCohort.cohort.users.map((user) =>
                                            <tr key={user.email} className="rev-table-row" >
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.email}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </ModalBody>
                    <ModalFooter id="manage-Cohort-modal-footer">
                        <div>{viewCohort.isSaved && 'saved'}</div>
                        <Button type="submit"
                            className="rev-btn"
                            disabled={viewCohort.isSaved}>Save
                    </Button>
                        <Button color="secondary" onClick={this.props.closeViewCohortModal}>
                            {viewCohort.isSaved ? 'Close' : 'Cancel'}
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
=======
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
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        );
    }
}