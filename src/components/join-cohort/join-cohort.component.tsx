import React from 'react'
import { Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IJoinCohortStateToProps, IJoinCohortDispatchToProps } from './join-cohort.container';
import { IUser } from '../../model/user.model';
import { IAuthState } from '../../reducers/management';
import { ICognitoUser } from '../../model/cognito-user.model';
import { History } from 'history';

const inputNames = {
  EMAIL: 'NEW_USER_EMAIL',
  FIRST_NAME: 'NEW_USER_FIRST_NAME',
  LAST_NAME: 'NEW_USER_LAST_NAME',
  PHONE: 'NEW_USER_PHONE'
}

interface IJoinCohortProps extends IJoinCohortStateToProps, IJoinCohortDispatchToProps {
  token: string,
  validToken: boolean,
  login: IAuthState



  findCohortByToken: (token:string) => void,
  joinCohort:(user:ICognitoUser, token:string, history:History) => void

}

export class JoinCohortComponent extends React.Component<IJoinCohortProps, any> {
  constructor(props) {
    super(props)
  }

  //assert cohort token is real
  //if not display not a valid cohort link,


  componentDidMount() {
    this.props.updateLocations();
    this.props.findCohortByToken(this.props.token);
  }

  componentDidUpdate() {
    if (this.props.login.currentUser.email && !this.props.joinCohortState.userToJoin.userId) {
      this.props.findLoggedInUser(this.props.login.currentUser);
    }
  }


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
      roles: [this.props.createUser.newUser.role],
    }
    this.props.updateNewUser(tempUser)
  }

  saveNewUser = async (e: React.FormEvent) => {
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
      roles: ['associate'],
    }
    await this.props.saveUserAssociate(tempUser);
    await this.joinCohort();
  }

  joinCohort = () => {
    this.props.joinCohort(this.props.joinCohortState.userToJoin, this.props.token, this.props.history)
  }



  //join cohort window has username and cohort name and a join button
  //after clicking join, take you to cohort page

  render() {


    if (this.props.joinCohortState.validToken) {

      if (this.props.joinCohortState.userToJoin.userId) {
        //If already logged in take to join cohort window
        return (
          <div>
            <p>logged in</p>
            <Button color='primary' onClick={this.joinCohort}>Join Cohort</Button>
          </div>
        )
      } else {
        //Offer login or signup for the current cohort
        //on successful login/signup, take to join cohort window
        let createUser = this.props.createUser;
        let addresses = this.props.addresses;
        return (
          <form onSubmit={this.saveNewUser}>
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
              </div>
            <Button type="submit" className="rev-btn">Save</Button>
          </form>

        )
      }
    } else {
      //Not a valid link
      return (
        <div>
          <p>not a real place</p>
        </div>
      )
    }
  }
}