import  React, { Component, FormEvent } from 'react';
import { IUser } from '../../model/user.model';
import { Container, Form, Row, FormGroup, Label, Input, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IAddressState } from '../../reducers/management';
import { IAddress } from '../../model/address.model';

// For the intial population of the user's info
// Retrieved from the redux store
interface IProfileProps {
  currentSMSUser: IUser
  userToView: IUser
  trainingAddresses: IAddressState
  updateUser(userToUpdate: IUser): void
  updateCurrentSMSUser(user: IUser): void
  updateUserTrainingLocation(location: IAddress): void
}

// This component keeps track of its own state
// The rest of the application does not need to know about the state
// of this component
interface IProfileState {
  editingUser: IUser
  trainingAddresses: IAddressState
  bFieldDidChange: boolean // Prevents user from spamming update
  bIsCurrentUser: boolean
  bTrainingLocationIsOpen: boolean
}

class Profile extends Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props)
    let endOfPath = location.pathname.split('/').pop();
    let userToView: null | IUser = null;
    let bIsCurrentUser: boolean = false;
    if (endOfPath && endOfPath === 'profile') {
      userToView = this.props.currentSMSUser;
      bIsCurrentUser= true;
    } else {
      // Need to check if user clicked on in modal is the current user
      // so we can update the current SMS user
      if (this.props.currentSMSUser.email === this.props.userToView.email) {
        bIsCurrentUser = true;
      }
      userToView = this.props.userToView;
    }

    this.state = {
      editingUser: userToView,
      trainingAddresses: this.props.trainingAddresses,
      bFieldDidChange: false,
      bIsCurrentUser: bIsCurrentUser,
      bTrainingLocationIsOpen: false
    }
  }

  onUserInfoChangeHandler = (event: FormEvent) => {
    const target = event.target as HTMLSelectElement;
    this.setState({
      ...this.state,
      editingUser: {
        ...this.state.editingUser,
        [target.name]: target.value
      },
      bFieldDidChange: true
    })
  }

  onTrainingLocationChangeHandler = (location: IAddress) => {
    this.props.updateUserTrainingLocation(location)
    this.setState({
      ...this.state,
      editingUser: {
        ...this.state.editingUser,
        trainingAddress: location
      }
    })
  }

  onAddressChangeHandler = (event: FormEvent) => {
    const target = event.target as HTMLSelectElement
    this.setState({
      ...this.state,
      editingUser: {
        ...this.state.editingUser,
        personalAddress: {
          ...this.state.editingUser.personalAddress,
          [target.name]: target.value
        }
      },
      bFieldDidChange: true
    })
  }

  onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (this.state.bFieldDidChange) {
      this.props.updateUser(this.state.editingUser); 
      this.setState({bFieldDidChange: false}); 

      // Update the current SMS User if it's their profile
      if (this.state.bIsCurrentUser) {
        this.props.updateCurrentSMSUser(this.state.editingUser);
      }
    }
    
  }

  trainingLocationListToggle = () => {
    this.setState({bTrainingLocationIsOpen: !this.state.bTrainingLocationIsOpen });
  }

  render() {

    return (
      <Container>
        <Form onSubmit={(event) => this.onSubmitHandler(event)}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  value={this.state.editingUser.email} readOnly />
              </FormGroup>
             </Col>
             <Col md={4}>
                <Label>Training Location</Label>
                <Dropdown
                  color="success" className="responsive-modal-row-item rev-btn"
                  isOpen={this.state.bTrainingLocationIsOpen} 
                  toggle={this.trainingLocationListToggle}>
                  <DropdownToggle caret>
                    {this.props.userToView.trainingAddress.alias}
                  </DropdownToggle>
                  <DropdownMenu>
                  {
                    this.state.trainingAddresses.trainingAddresses.length === 0
                      ? <>
                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : this.state.trainingAddresses.trainingAddresses.map(location =>
                        <DropdownItem 
                          key={location.addressId}
                          onClick={() => this.props.updateUserTrainingLocation(location)} >{location.alias}</DropdownItem>
                      )
                  } 
                  </DropdownMenu>
                </Dropdown>
             </Col>
          </Row>
          <Row>
            
            <Col md={4}>
              <FormGroup>
                <Label>Firstname</Label>
                <Input 
                  type="text" 
                  name="firstName"
                  defaultValue={this.state.editingUser.firstName}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Lastname</Label>
                <Input 
                  type="text" 
                  name="lastName"
                  defaultValue={this.state.editingUser.lastName}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input 
                  type="tel" 
                  pattern="^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$"
                  name="phoneNumber"
                  defaultValue={this.state.editingUser.phoneNumber}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label>Street</Label>
          <Input
            type="text" 
            name="street" 
            defaultValue={this.state.editingUser.personalAddress && this.state.editingUser.personalAddress.street}
            onChange={(event) => this.onAddressChangeHandler(event)} />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name="city"  
                defaultValue={this.state.editingUser.personalAddress && this.state.editingUser.personalAddress.city}
                onChange={(event) => this.onAddressChangeHandler(event)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>State</Label>
              <Input 
                type="text" 
                name="state"
                defaultValue={this.state.editingUser.personalAddress && this.state.editingUser.personalAddress.state}
                onChange={(event) => this.onAddressChangeHandler(event)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Zip</Label>
              <Input 
                type="text" 
                name="zip" 
                defaultValue={this.state.editingUser.personalAddress && this.state.editingUser.personalAddress.zip}
                onChange={(event) => this.onAddressChangeHandler(event)} />
            </FormGroup>  
          </Col>
        </Row>
        <Button>Update</Button>
      </Form>
      </Container>
    )
  }
}

export default Profile;
