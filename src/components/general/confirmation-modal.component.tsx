import * as React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';


interface ConfirmationModalProps {
    isOpen: boolean;
    question: string;
    yesResponse: () => void;
    cancelResponse: () => void;
    closeModal: () => void;
}

export class ConfirmationModal extends React.PureComponent<ConfirmationModalProps> {
    constructor(props: ConfirmationModalProps) {
        super(props);
    }

    triggerYesResponse = () => {
        this.props.yesResponse();
        this.props.closeModal();
    }

    triggerCancelResponse = () => {
        this.props.cancelResponse();
        this.props.closeModal();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <form onSubmit={this.triggerYesResponse}>
                    <ModalHeader className="rev-background-color">Confirm</ModalHeader>
                    <ModalBody>
                        <div className="responsive-modal-row">
                            <textarea name={'question'}
                                className="responsive-modal-row-item"
                                placeholder="Description"
                                value={this.props.question}
                                required />
                        </div>
                    </ModalBody>
                    <ModalFooter id="create-Cohort-modal-footer">
                        <Button type="submit" className="rev-btn" >
                            Yes
                        </Button>
                        {' '}
                        <Button color="secondary" onClick={this.triggerCancelResponse}>
                            {'Cancel'}
                        </Button>
                    </ModalFooter>
                </form>
            </Modal >

        );
    }
}