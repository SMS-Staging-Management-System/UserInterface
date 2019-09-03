import React from 'react'
import { connect } from "react-redux";
import { IState } from '../../reducers';
import { Button, Input, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card } from 'reactstrap';
import { joinCohort, saveUserAssociate } from '../../actions/join-cohort/join-cohort.actions'
import { ICreateUserState, IAddressState, IJoinCohortState } from "../../reducers/management";
import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { updateNewUser, updateNewUserLocation, toggleLocationDropdown } from '../../actions/create-user/create-user.actions'
import { updateLocations } from '../../actions/address/address.actions';
import { History } from "history";
import { withRouter } from 'react-router-dom';

const inputNames = {
    EMAIL: 'NEW_USER_EMAIL',
    FIRST_NAME: 'NEW_USER_FIRST_NAME',
    LAST_NAME: 'NEW_USER_LAST_NAME',
    PHONE: 'NEW_USER_PHONE'
  }

export interface ICreateUserProps {
    token: string,
    createUser: ICreateUserState,
    addresses: IAddressState,
    joinCohortState: IJoinCohortState,
    history: History,
    joinCohort: (user:IUser, token:string, history:History) => void,
    updateNewUserLocation: (location: IAddress) => void,
    updateNewUser: (user: IUser) => void,
    toggleLocationDropdown: () => void,
    saveUserAssociate: (user:IUser, history:History) => void
  }
  
  export class CreateUserComponent extends React.Component<ICreateUserProps, IJoinCohortState> {
    constructor(props) {
      super(props)
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
        // tslint:disable-next-line: object-literal-sort-keys
        firstName: updatedNewUser.firstName,
        lastName: updatedNewUser.lastName,
        phoneNumber: updatedNewUser.phoneNumber,
        trainingAddress: updatedNewUser.trainingAddress,
        personalAddress: {
          addressId: 0,
          street: '',
          // tslint:disable-next-line: object-literal-sort-keys
          alias: '',
          city: '',
          country: '',
          state: '',
          zip: ''
        },
        userStatus: {
          statusId: 0,
          // tslint:disable-next-line: object-literal-sort-keys
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
      const tempUser: IUser = {
        userId: 0,
        userStatus: {
          statusId: 2,
          // tslint:disable-next-line: object-literal-sort-keys
          generalStatus: 'Training',
          specificStatus: 'Training',
          virtual: false
        },
        // tslint:disable-next-line: object-literal-sort-keys
        roles: ['associate'],
        trainingAddress: this.props.createUser.newUser.trainingAddress,
        personalAddress: {
          addressId: 0,
          street: '',
          // tslint:disable-next-line: object-literal-sort-keys
          alias: '',
          city: '',
          country: '',
          state: '',
          zip: ''
        },
        email: this.props.createUser.newUser.email,
        firstName: this.props.createUser.newUser.firstName,
        lastName: this.props.createUser.newUser.lastName,
        phoneNumber: this.props.createUser.newUser.phoneNumber
      }
      // tslint:disable-next-line: no-invalid-await
      await this.props.saveUserAssociate(tempUser, this.props.history);
      this.props.joinCohort(this.props.joinCohortState.userToJoin, this.props.token, this.props.history);
    }

    signIn = () => {
      this.props.history.push('/management/login');
    }
  
    // join cohort window has username and cohort name and a join button
    // after clicking join, take you to cohort page
  
    render() {
     const { createUser, addresses } = this. props;
     return (
       <Card
        className="join-cohort-signup-card">
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
                       ? 
                       <>
                         <DropdownItem>Unable To Find Any Locations</DropdownItem>
                         <DropdownItem divider />
                       </>
                       : 
                       addresses.trainingAddresses.map(location =>
                         <DropdownItem key={location.addressId} onClick={() => this.props.updateNewUserLocation(location)}>{location.alias}</DropdownItem>
                       )
                   }
                 </DropdownMenu>
               </Dropdown>
             </div>
             </div>
           <Button type="submit" className="rev-btn">Create user</Button>
           <Button color="link" onClick={this.signIn}>Already have an account? Sign in</Button>
         </form>
        </Card>
          )
        }
      }
  
  const mapStateToProps = (state:IState, ownProps) => ({
    addresses: state.managementState.addresses,
    createUser: state.managementState.createUser, 
    history: ownProps.history,
    joinCohortState: state.managementState.joinCohort,
    token: ownProps.match.params.token
  })
  
  
  const mapDispatchToProps = {
    joinCohort,
    updateNewUser,
    updateNewUserLocation,
    // tslint:disable-next-line: object-literal-sort-keys
    updateLocations,
    toggleLocationDropdown,
    saveUserAssociate
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserComponent))