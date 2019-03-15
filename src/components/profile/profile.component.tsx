import  React, { Component, FormEvent } from 'react';
import { Container, Form, Row, FormGroup, Label, Input, 
  Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IAddress } from '../../model/address.model';
import { IProfileProps } from './profile.container';

export const inputNames = {
  EMAIL: 'NEW_USER_EMAIL',
  FIRST_NAME: 'NEW_USER_FIRST_NAME',
  LAST_NAME: 'NEW_USER_LAST_NAME',
  PHONE: 'NEW_USER_PHONE',
  STREET: 'STREET',
  CITY: 'CITY',
  STATE: 'STATE',
  ZIP: 'ZIP',
  TRAINING_ALIASES: 'TRAINING_ALIASES'
}

class Profile extends Component<IProfileProps, any> {


  componentWillMount() {
    // If looking at profile page, set info to current SMS User
    let endOfPath = location.pathname.split('/').pop();
    if (endOfPath && endOfPath === 'profile') {
      this.props.setToCurrentSMSUser(this.props.currentSMSUser);
    } else {
      // Need to check if user clicked on in modal is the current user
      // so we can update the current SMS user
      if (this.props.currentSMSUser.email === this.props.userToView.email) {
        this.props.setToCurrentSMSUser(this.props.currentSMSUser);
      }
    }
  }


  onUserInfoChangeHandler = (event: React.FormEvent) => {
    let updatedUser = {...this.props.userToView};
    
    const target = event.target as HTMLSelectElement;
    switch (target.name) {
      case inputNames.EMAIL:
        updatedUser = {
          ...updatedUser,
          email: target.value
        }
        break;
      case inputNames.FIRST_NAME:
        updatedUser = {
          ...updatedUser,
          firstName: target.value
        }
        break;
      case inputNames.LAST_NAME:
        updatedUser = {
          ...updatedUser,
          lastName: target.value
        }
        break;
      case inputNames.PHONE:
        updatedUser = {
          ...updatedUser,
          phoneNumber: target.value
        }
        break;
      case inputNames.STREET:
        updatedUser = {
          ...updatedUser,
          personalAddress: {
            ...updatedUser.personalAddress,
            street: target.value
          }
        }
        break;
        case inputNames.CITY:
        updatedUser = {
          ...updatedUser,
          personalAddress: {
            ...updatedUser.personalAddress,
            city: target.value
          }
        }
        break;
        case inputNames.STATE:
        updatedUser = {
          ...updatedUser,
          personalAddress: {
            ...updatedUser.personalAddress,
            state: target.value
          }
        }
        case inputNames.ZIP:
        updatedUser = {
          ...updatedUser,
          personalAddress: {
            ...updatedUser.personalAddress,
            zip: target.value
          }
        }
        break;
      default:
        break;
    }
    this.props.updateUserInfo(updatedUser);
  }

  onTrainingLocationChangeHandler = (location: IAddress) => {
    this.props.updateUserTrainingLocation(location)
  }

  onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (this.props.bUserInfoChanged) {
      this.props.updateUser(this.props.userToView); 
    }
  }

  trainingLocationListToggle = () => {
    this.props.toggleTrainingLocationsDropdown();
  }

  render() {
    const {userToView, trainingAddresses} = this.props;
    return (
      <Container>
        <Form onSubmit={(event) => this.onSubmitHandler(event)}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  name={inputNames.EMAIL} 
                  value={userToView.email} readOnly />
              </FormGroup>
             </Col>
             <Col md={4}>
                <Label>Training Location</Label>
                <Dropdown
                  color="success" className="responsive-modal-row-item rev-btn"
                  isOpen={this.props.locationDropdownActive}
                  toggle={this.props.toggleTrainingLocationsDropdown}>
                  <DropdownToggle caret>
                    {userToView.trainingAddress.alias || 'Location'}
                  </DropdownToggle>
                  <DropdownMenu name={inputNames.TRAINING_ALIASES}>
                  {
                    trainingAddresses.trainingAddresses.length === 0
                      ? <>
                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                        <DropdownItem divider />
                      </>
                      : trainingAddresses.trainingAddresses.map(location =>
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
                  name={inputNames.FIRST_NAME}
                  value={userToView.firstName}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Lastname</Label>
                <Input 
                  type="text" 
                  name={inputNames.LAST_NAME}
                  value={userToView.lastName}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input 
                  type="tel" 
                  pattern="^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$"
                  name={inputNames.PHONE}
                  value={userToView.phoneNumber}
                  onChange={(event) => this.onUserInfoChangeHandler(event)} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label>Street</Label>
          <Input
            type="text" 
            name={inputNames.STREET}
            value={userToView.personalAddress && userToView.personalAddress.street}
            onChange={(event) => this.onUserInfoChangeHandler(event)} />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name={inputNames.CITY}  
                value={userToView.personalAddress && userToView.personalAddress.city}
                onChange={(event) => this.onUserInfoChangeHandler(event)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>State</Label>
              <Input 
                type="text" 
                name={inputNames.STATE}
                value={userToView.personalAddress && userToView.personalAddress.state}
                onChange={(event) => this.onUserInfoChangeHandler(event)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Zip</Label>
              <Input 
                type="text" 
                name={inputNames.ZIP}
                value={userToView.personalAddress && userToView.personalAddress.zip}
                onChange={(event) => this.onUserInfoChangeHandler(event)} />
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
