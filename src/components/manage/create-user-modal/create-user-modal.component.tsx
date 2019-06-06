import * as React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICreateUserModal } from './create-user-modal.container';
import { IUser } from '../../../model/user.model';
import Label from 'reactstrap/lib/Label';
import { cognitoRoles } from '../../../model/cognito-user.model';


const inputNames = {
  EMAIL: 'NEW_USER_EMAIL',
  FIRST_NAME: 'NEW_USER_FIRST_NAME',
  LAST_NAME: 'NEW_USER_LAST_NAME',
  PHONE: 'NEW_USER_PHONE'
}


export class CreateUserModal extends React.Component<ICreateUserModal, any> {
  constructor(props: ICreateUserModal) {
    super(props);
  }

  componentDidMount() {
    this.props.updateLocations();
  }

  //This updates the user when the input data
  updateNewUserInfo = (e: React.FormEvent) => {
    let updatedNewUser = this.props.createUser.newUser;

    const target = e.target as HTMLSelectElement;
    switch (target.name) {
      case inputNames.EMAIL:
        updatedNewUser = {
          ...updatedNewUser,
          email: target.value
        }
        break;
      case inputNames.FIRST_NAME:
        updatedNewUser = {
          ...updatedNewUser,
          firstName: target.value
        }
        break;
      case inputNames.LAST_NAME:
        updatedNewUser = {
          ...updatedNewUser,
          lastName: target.value
        }
        break;
      case inputNames.PHONE:
        updatedNewUser = {
          ...updatedNewUser,
          phoneNumber: target.value
        }
        break;
      default:
        break;
    }
    const tempUser: IUser = {
      email: updatedNewUser.email,
      userId: 0,
      firstName: updatedNewUser.firstName,
      lastName: updatedNewUser.lastName,
      phoneNumber: updatedNewUser.phoneNumber,
      trainingAddress: updatedNewUser.trainingAddress,
      personalAddress: {
        addressId: 0,
        street: '',
        alias: '',
        city: '',
        country: '',
        state: '',
        zip: ''
      },
      userStatus: {
        statusId: 0,
        generalStatus: '',
        specificStatus: '',
        virtual: false,
      },
      roles: [updatedNewUser.role],
    }
    //This function is what updates the temp user on the redux store
    this.props.updateNewUser(tempUser)
    //This function is what updates the temp user's cohort.
    this.props.updateNewUserCohort(updatedNewUser.cohort);
  }

  //This is saving the new user.
  saveNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('saving')
    const tempUser: IUser = {
      email: this.props.createUser.newUser.email,
      userId: 0,
      firstName: this.props.createUser.newUser.firstName,
      lastName: this.props.createUser.newUser.lastName,
      phoneNumber: this.props.createUser.newUser.phoneNumber,
      trainingAddress: this.props.createUser.newUser.trainingAddress,
      personalAddress: {
        addressId: 0,
        street: '',
        alias: '',
        city: '',
        country: '',
        state: '',
        zip: ''
      },
      userStatus: {
        statusId: 2,
        generalStatus: 'Training',
        specificStatus: 'Training',
        virtual: false
      },
      roles: [this.props.createUser.newUser.role],
    }

    //This function saves the user on redux store.
    this.props.saveUser(tempUser, this.props.createUser.newUser.cohort);
  }



  render() {
    const { createUser, addresses, cohorts } = this.props;
    return (
      <Modal isOpen={this.props.createUser.enabled} id="create-user-modal" className="futurafont">
        <form onSubmit={this.saveNewUser}>
          <ModalHeader className="rev-background-color">Create User</ModalHeader>
          <ModalBody>
            <div className="responsive-modal-row">
              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-firstname-input">First Name</Label>
                <Input name={inputNames.FIRST_NAME}
                  id="create-user-firstname-input"
                  className="responsive-modal-row-item"
                  placeholder="First Name"
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.firstName}
                  valid={!!createUser.newUser.firstName}
                  invalid={!createUser.newUser.firstName} />
              </div>

              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-lastname-input">Last Name</Label>
                <Input name={inputNames.LAST_NAME}
                  id="create-user-lastname-input"
                  className="responsive-modal-row-item"
                  placeholder="Last Name"
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.lastName}
                  valid={!!createUser.newUser.lastName}
                  invalid={!createUser.newUser.lastName} />
              </div>
            </div>
            <div className="responsive-modal-row">
              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-email-input">Email</Label>
                <Input className="responsive-modal-row-item"
                  id="create-user-email-input"
                  name={inputNames.EMAIL}
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.email}
                  valid={!!createUser.newUser.email}
                  invalid={!createUser.newUser.email}
                  placeholder="Email" />
              </div>
              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-phoneNumber-input">Phone Number</Label>
                <Input className="responsive-modal-row-item"
                  id="create-user-phoneNumber-input"
                  name={inputNames.PHONE}
                  onChange={this.updateNewUserInfo}
                  value={createUser.newUser.phoneNumber}
                  valid={!!createUser.newUser.phoneNumber}
                  invalid={!createUser.newUser.phoneNumber}
                  placeholder="Phone Number" />
              </div>
            </div>
            <div className="responsive-modal-row create-user-buttons">
              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-location-dropdown">Location</Label>
                <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                  id="create-user-location-dropdown"
                  isOpen={this.props.createUser.locationDropdownActive}
                  toggle={this.props.toggleLocationDropdown}>
                  <DropdownToggle caret>
                    {createUser.newUser.trainingAddress.alias || 'Location'}
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
              </div>
              {/* Checkbox to manage the user's roles */}
              <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-role-dropdown">Role</Label>
                <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                  id="create-user-role-dropdown"
                  isOpen={this.props.createUser.roleDropdownActive}
                  toggle={this.props.toggleRoleDropdown}>
                  <DropdownToggle caret>
                    {createUser.newUser.dropdownRole || 'Role'}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.props.updateNewUserRole(cognitoRoles.ADMIN, 'Admin')}>Admin</DropdownItem>
                    <DropdownItem onClick={() => this.props.updateNewUserRole(cognitoRoles.STAGING_MANAGER, 'Staging Manager')}>Staging Manager</DropdownItem>
                    <DropdownItem onClick={() => this.props.updateNewUserRole(cognitoRoles.TRAINER, 'Trainer')}>Trainer</DropdownItem>
                    <DropdownItem onClick={() => this.props.updateNewUserRole('associate', 'Associate')}>Associate</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              {createUser.newUser.cohort && <div className="responsive-modal-column create-user-margin">
                <Label for="create-user-cohort-dropdown">Cohort</Label>
                <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                  id="create-user-cohort-dropdown"
                  isOpen={this.props.createUser.cohortDropdownActive}
                  toggle={this.props.toggleCohortDropdown}>
                  <DropdownToggle caret>
                    {createUser.newUser.cohort.cohortName || 'Cohort'}
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      cohorts.cohorts.length === 0
                        ? <>
                          <DropdownItem>Unable To Find Any Cohorts</DropdownItem>
                          <DropdownItem divider />
                        </>
                        : cohorts.cohorts.map(cohort =>
                          <DropdownItem key={cohort.cohortId} onClick={() => this.props.updateNewUserCohort(cohort)}>{cohort.cohortName}</DropdownItem>
                        )
                    }
                  </DropdownMenu>
                </Dropdown>
              </div>}
            </div>
          </ModalBody>
          <ModalFooter id="create-user-modal-footer">
            <Button type="submit" className="rev-btn">Save</Button>{' '}
            <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>

    );
  }
}

