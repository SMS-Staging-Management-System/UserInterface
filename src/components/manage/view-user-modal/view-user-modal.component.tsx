import * as React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  // InputGroup, InputGroupText, InputGroupAddon, Input,
  // Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { IViewUserModal } from './view-user-modal.container';


// const inputNames = {
//   EMAIL: 'NEW_USER_EMAIL',
//   FIRST_NAME: 'NEW_USER_FIRST_NAME',
//   LAST_NAME: 'NEW_USER_LAST_NAME',
//   PHONE: 'NEW_USER_PHONE'
// }


export class ViewUserModal extends React.Component<IViewUserModal, any> {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.updateLocations();
  // }

  


  render() {
  //  addresses 
    // const { viewUser } = this.props;
    return (
      <Modal isOpen={this.props.viewUser.enabled}>
          <ModalHeader className="rev-background-color">User info</ModalHeader>
          <ModalBody>
            {this.props.viewUser.enabled? "true": "false"}
            <div className="responsive-modal-row">
              
            </div>
          </ModalBody>
          <ModalFooter id="create-user-modal-footer">
            <Button color="secondary" onClick={this.props.toggleViewUserModal}>Close</Button>
          </ModalFooter>
      </Modal>

    );
  }
}

