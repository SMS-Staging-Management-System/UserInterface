import * as React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { IViewUserModal } from './view-user-modal.container';


export class ViewUserModal extends React.Component<IViewUserModal, any> {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.updateLocations();
  // }


  render() {
    return (
      <Modal isOpen={this.props.viewUser.enabled}>
          <ModalHeader className="rev-background-color">User info</ModalHeader>
          <ModalBody>
            {/* {this.props.viewUser.enabled? "true": "false"} */}
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

