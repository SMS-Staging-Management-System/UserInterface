import * as React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  InputGroup, InputGroupText, InputGroupAddon, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICreateUserModal } from './create-user-modal.container';


export class CreateUserModal extends React.Component<ICreateUserModal, any> {
  constructor(props) {
    super(props);
  }



  render() {

    const { createUser, addresses } = this.props;
    return (
      <Modal isOpen={this.props.createUser.enabled}>
        <ModalHeader className="rev-background-color">Modal title</ModalHeader>
        <ModalBody>
          <form>
            <div className="responsive-modal-row">
              <InputGroup className="responsive-modal-row-item">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
              <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                isOpen={this.props.createUser.locationDropdownActive}
                toggle={this.props.toggleLocationDropdown}>
                <DropdownToggle caret>
                  {createUser.newUser.address.alias || 'Location'}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    createUser.newUser.address.alias
                      ? <>
                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : addresses.trainingAddresses.map(location =>
                        <>
                          <DropdownItem onClick={() => this.props.updateNewUserLocation(location)}>{location.alias}</DropdownItem>
                          <DropdownItem divider />
                        </>
                      )
                  }
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="responsive-modal-row">
              <Input className="responsive-modal-row-item" placeholder="First Name" />
              <Input className="responsive-modal-row-item" placeholder="Last Name" />
            </div>
            <div className="responsive-modal-row">
              <InputGroup className="responsive-modal-row-item">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Phone Number</InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </div>
          </form>
        </ModalBody>
        <ModalFooter id="create-user-modal-footer">
          <Button type="submit" className="rev-btn" onClick={() => this.props.saveUser(this.props.createUser.newUser)}>Save</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

