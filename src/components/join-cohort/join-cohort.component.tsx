import React from 'react'
import {
    Button, 
    InputGroup, InputGroupText, InputGroupAddon, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import { IJoinCohortStateToProps, IJoinCohortDispatchToProps } from './join-cohort.container';

const inputNames = {
    EMAIL: 'NEW_USER_EMAIL',
    FIRST_NAME: 'NEW_USER_FIRST_NAME',
    LAST_NAME: 'NEW_USER_LAST_NAME',
    PHONE: 'NEW_USER_PHONE'
  }

interface IJoinCohortProps extends IJoinCohortStateToProps, IJoinCohortDispatchToProps{
    // token: string,
    // validToken: boolean,
    // login: IAuthState,



    // //findCohortByToken: (token:string) => void,
    // joinCohort:(user:ICognitoUser, token:string) => void

}

export class JoinCohortComponent extends React.Component<IJoinCohortProps, any> {
    constructor(props){
        super(props)
    }

    //assert cohort token is real
    //if not display not a valid cohort link,


    componentDidMount() {
        this.props.updateLocations();
         //this.props.findCohortByToken(this.props.token);
      }
    
    componentDidUpdate() {
        if(this.props.login.currentUser.email && !this.props.joinCohortState.userToJoin.userId){
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
        this.props.updateNewUser(updatedNewUser)
      }
    
      saveNewUser = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('saving')
        this.props.saveUserAssociate(this.props.createUser.newUser);
      }
    




    joinCohort = () => {
        this.props.joinCohort(this.props.joinCohortState.userToJoin, this.props.token)
    }
   

    
    //join cohort window has username and cohort name and a join button
    //after clicking join, take you to cohort page

    render(){


        if(this.props.joinCohortState.validToken){
            
            if(this.props.joinCohortState.userToJoin.userId){
                //If already logged in take to join cohort window
                return(
                    <div>
                        <p>logged in</p>
                        <Button color='primary' onClick={this.joinCohort}>Join Cohort</Button>
                    </div>
                )
            }else {
                //Offer login or signup for the current cohort
                //on successful login/signup, take to join cohort window
                let createUser = this.props.createUser;
                let addresses = this.props.addresses
                return(
                    
                        
                        <form onSubmit={this.saveNewUser}>
                        <div className="responsive-modal-row">
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
                        <div className="responsive-modal-row">
                              <Input name={inputNames.FIRST_NAME}
                              className="responsive-modal-row-item"
                             placeholder="First Name"
                             onChange={this.updateNewUserInfo}
                             value={createUser.newUser.firstName}
                             valid={!!createUser.newUser.firstName}
                             invalid={!createUser.newUser.firstName} />

                          <Input name={inputNames.LAST_NAME}
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

                            </InputGroup>
                        </div>
                        <Button type="submit" className="rev-btn">Save</Button>
                        </form>
                    
                )
            }
        } else {
            //Not a valid link
            return(
                <div>
                    <p>not a real place</p>
                </div>
            )
        }
    }



}