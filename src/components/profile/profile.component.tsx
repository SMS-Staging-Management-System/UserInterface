import  React, { Component } from 'react';
import { IUser } from '../../model/user.model';
import { Container, Form, Row, FormGroup, Label, Input, Col, Button } from 'reactstrap';

// For the intial population of the user's info
// Retrieved from the redux store
interface IProfileProps {
  user: IUser
  updateCurrentSMSUser(userToUpdate: IUser): void
}

// This component keeps track of its own state
// The rest of the application does not need to know about the state
// of this component
interface IProfileState {
  user: IUser
  bFieldDidChange: boolean // Prevents user from spamming update
}

class Profile extends Component<IProfileProps, IProfileState> {
 
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      bFieldDidChange: false
    };
  }

  onUserInfoChangeHandler = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      },
      bFieldDidChange: true
    })
  }

  onAddressChangeHandler = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        address: {
          ...this.state.user.trainingAddress,
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
      this.props.updateCurrentSMSUser(this.state.user); 
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
                  value={this.props.user.email} readOnly />
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
                  defaultValue={this.state.user.firstName}
                  onChange={() => this.onUserInfoChangeHandler(event)} required />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Lastname</Label>
                <Input 
                  type="text" 
                  name="lastName"
                  defaultValue={this.state.user.lastName}
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
                  defaultValue={this.state.user.phoneNumber}
                  onChange={() => this.onUserInfoChangeHandler(event)} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label>Street</Label>
          <Input
            type="text" 
            name="street" 
            defaultValue={this.state.user.trainingAddress.street}
            onChange={() => this.onAddressChangeHandler(event)} required />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name="city"  
                defaultValue={this.state.user.trainingAddress.city}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>State</Label>
              <Input 
                type="text" 
                name="state"
                defaultValue={this.state.user.trainingAddress.state}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Zip</Label>
              <Input 
                type="text" 
                name="zip" 
                defaultValue={this.state.user.trainingAddress.zip}
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
