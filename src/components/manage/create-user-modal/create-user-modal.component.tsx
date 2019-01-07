import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
    InputGroup, InputGroupText, InputGroupAddon, Input, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ICreateUserModal } from './create-user-modal.container';


export class CreateUserModal extends React.Component<ICreateUserModal, any> {
  constructor(props) {
    super(props);
  }



  render() {
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
                  Location
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Reston</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>USF</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>UTA</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="responsive-modal-row">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input />
              </InputGroup>
            </div>
          </form>
        </ModalBody>
        <ModalFooter id="create-user-modal-footer">
          <Button type="submit" className="rev-btn" onClick={() => this.props.saveUser(this.props.newUser)}>Save</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

