import * as React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { IViewUserModal } from './view-user-modal.container';
import Profile from '../../profile/profile.container';



export class ViewUserModal extends React.Component<IViewUserModal, any> {
  constructor(props) {
    super(props);
  }

  render() {

    let currentModalDisplay = (<><div className="responsive-modal-row">
    <p>First Name: {this.props.viewUser.newUser.firstName || 'Unknown'}</p>
  </div>
  <div className="responsive-modal-row">
    <p>Last Name: {this.props.viewUser.newUser.lastName || 'Unknown'}</p>
  </div>
  <div className="responsive-modal-row">
    <p>Email: {this.props.viewUser.newUser.email || 'Unknown'}</p>
  </div>
  <div className="responsive-modal-row">
    <p>Phone Number: {this.props.viewUser.newUser.phoneNumber || 'Unknown'}</p>
  </div>
  <div className="responsive-modal-row">
    {/* In case the user that's returned is not
      * well formatted, we need a guard
      * to make sure the app doesn't crash
      * on failing to load the address
      * alias
      */}
    <p>Training Location: {this.props.viewUser.newUser.trainingAddress && this.props.viewUser.newUser.trainingAddress.alias ||'no alias'}</p>
  </div></>);

    return (
      <Modal isOpen={this.props.viewUser.enabled}>
          <ModalHeader className="rev-background-color">User info</ModalHeader>
          <ModalBody>
          
          {this.props.user.roles.some(role => (role !== 'admin')) ?  <Profile/> : currentModalDisplay }
            
          </ModalBody>
          <ModalFooter id="create-user-modal-footer">
            <Button color="secondary" onClick={this.props.toggleViewUserModal}>Close</Button>           
          </ModalFooter>
      </Modal>

    );
  }
}

