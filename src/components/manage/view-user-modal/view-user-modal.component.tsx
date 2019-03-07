import * as React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { IViewUserModal } from './view-user-modal.container';


export class ViewUserModal extends React.Component<IViewUserModal, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal isOpen={this.props.viewUser.enabled}>
          <ModalHeader className="rev-background-color">User info</ModalHeader>
          <ModalBody>
            <div className="responsive-modal-row">
              <p>First Name: {this.props.viewUser.newUser.firstName}</p>
            </div>
            <div className="responsive-modal-row">
              <p>Last Name: {this.props.viewUser.newUser.lastName}</p>
            </div>
            <div className="responsive-modal-row">
              <p>Email: {this.props.viewUser.newUser.email}</p>
            </div>
            <div className="responsive-modal-row">
              <p>Phone Number: {this.props.viewUser.newUser.phoneNumber}</p>
            </div>
            <div className="responsive-modal-row">
              <p>Address: {this.props.viewUser.newUser.address.alias}</p>
            </div>
          </ModalBody>
          <ModalFooter id="create-user-modal-footer">
            <Button color="secondary" onClick={this.props.toggleViewUserModal}>Close</Button>
          </ModalFooter>
      </Modal>

    );
  }
}

