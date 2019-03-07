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
            {/* <div className="responsive-modal-row">
              <InputGroup className="responsive-modal-row-item">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Email</InputGroupText>
                </InputGroupAddon>
                <Input name={inputNames.EMAIL}
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.email}
                  valid={!!createUser.newUser.email}
                  invalid={!createUser.newUser.email} />
              </InputGroup>
              <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                isOpen={this.props.createUser.locationDropdownActive}
                toggle={this.props.toggleLocationDropdown}>
                <DropdownToggle caret>
                  {createUser.newUser.address.alias || 'Location'}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    addresses.trainingAddresses.length === 0
                      ? <>
                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : addresses.trainingAddresses.map(location =>
                        <DropdownItem key={location.addressId} onClick={() => this.props.updateNewUserLocation(location)}>{location.alias}</DropdownItem>
                      )
                  }
                </DropdownMenu>
              </Dropdown>
            </div> */}
            <div className="responsive-modal-row">
              {/* <p className="responsive-modal-row-item">First Name: {viewUser.newUser.firstName}</p> */}

              {/* <Input name={inputNames.LAST_NAME}
                className="responsive-modal-row-item"
                placeholder="Last Name"
                onChange={this.updateNewUserInfo}
                value={createUser.newUser.lastName}
                valid={!!createUser.newUser.lastName}
                invalid={!createUser.newUser.lastName} />
            </div>
            <div className="responsive-modal-row">
              <InputGroup className="responsive-modal-row-item">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Phone Number</InputGroupText>
                </InputGroupAddon>
                <Input type="number"
                  name={inputNames.PHONE}
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.phoneNumber}
                  valid={!!createUser.newUser.phoneNumber}
                  invalid={!createUser.newUser.phoneNumber} />

              </InputGroup> */}
            </div>
          </ModalBody>
          <ModalFooter id="create-user-modal-footer">
            <Button color="secondary" onClick={this.props.toggleModal}>Close</Button>
          </ModalFooter>
        {/* </form> */}
      </Modal>

    );
  }
}

