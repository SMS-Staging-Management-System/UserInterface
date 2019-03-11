import  React, { Component } from 'react';
import { IUser } from '../../model/user.model';
import { Container, Form, Row, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { IViewUserModal } from '../manage/view-user-modal/view-user-modal.container';

// For the intial population of the user's info
// Retrieved from the redux store
interface IProfileProps {
  currentSMSUser: IUser
  userToView: IUser
  bIsLoggedInUser: boolean
  viewProfile(currentUser: IViewUserModal)
  updateUser(userToUpdate: IUser): void
}

// This component keeps track of its own state
// The rest of the application does not need to know about the state
// of this component
interface IProfileState {
  editingUser: IUser
  bFieldDidChange: boolean // Prevents user from spamming update
}

class Profile extends Component<IProfileProps, IProfileState> {
 
  // Decide which user this state is here
  constructor(props) {
    super(props);
    let userToView: IUser = this.props.currentSMSUser;
    if (this.props.bIsLoggedInUser) {
          userToView = this.props.currentSMSUser;
    }

    this.state = {
      editingUser: userToView,
      bFieldDidChange: false
    };
  }

  onUserInfoChangeHandler = (event) => {
    this.setState({
      ...this.state,
      editingUser: {
        ...this.state.editingUser,
        [event.target.name]: event.target.value
      },
      bFieldDidChange: true
    })
  }

  onAddressChangeHandler = (event) => {
    this.setState({
      ...this.state,
      editingUser: {
        ...this.state.editingUser,
        address: {
          ...this.state.editingUser.address,
          [event.target.name]: event.target.value
        }
      },
      bFieldDidChange: true
    })
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state.bFieldDidChange);
    if (this.state.bFieldDidChange) {
      this.props.updateUser(this.state.editingUser); 
      this.setState({bFieldDidChange: false}); 
    }
    
  }

  render() {


    return (
      <Container>
        <Form onSubmit={() => this.onSubmitHandler(event)}>
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
          </Row>
          <Row>
            
            <Col md={4}>
              <FormGroup>
                <Label>Firstname</Label>
                <Input 
                  type="text" 
                  name="firstName"
                  defaultValue={this.state.editingUser.firstName}
                  onChange={() => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Lastname</Label>
                <Input 
                  type="text" 
                  name="lastName"
                  defaultValue={this.state.editingUser.lastName}
                  onChange={() => this.onUserInfoChangeHandler(event)} required />
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
                  onChange={() => this.onUserInfoChangeHandler(event)} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label>Street</Label>
          <Input
            type="text" 
            name="street" 
            defaultValue={this.state.editingUser.address.street}
            onChange={() => this.onAddressChangeHandler(event)} required />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name="city"  
                defaultValue={this.state.editingUser.address.city}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>State</Label>
              <Input 
                type="text" 
                name="state"
                defaultValue={this.state.editingUser.address.state}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Zip</Label>
              <Input 
                type="text" 
                name="zip" 
                defaultValue={this.state.editingUser.address.zip}
                onChange={() => this.onAddressChangeHandler(event)} required />
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
