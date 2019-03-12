import React from 'react';
import { Modal, Button } from 'react-bootstrap'
//import {  ISurveyState } from '../../reducers/survey';

interface TemplateModalProps {
    showModal: boolean,
    ownProps: any,
    handleShow: () => void,
    handleClose: () => void
}
export class TemplateModalComponent extends React.Component<TemplateModalProps, any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={() => this.props.handleShow()}>
                    Launch demo modal
        </Button>

                <Modal show={this.props.showModal} onHide={() => this.props.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Make Your Selection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You can either create a new template or edit a survey using the template</Modal.Body>
                    <Modal.Footer>
                        <Button className="buttonEdit" onClick={() => this.props.handleClose()}>
                            Edit
            </Button>
                        <Button className="buttonCreate" onClick={() => this.props.handleClose()}>
                            Create
            </Button>
                    </Modal.Footer>
                </Modal>
            </>

        )
    }

}