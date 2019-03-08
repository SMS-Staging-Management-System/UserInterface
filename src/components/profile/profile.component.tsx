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
          ...this.state.user.address,
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
          </Row>
        <FormGroup>
          <Label>Street</Label>
          <Input
            type="text" 
            name="street" 
            defaultValue={this.state.user.address.street}
            onChange={() => this.onAddressChangeHandler(event)} required />
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input 
                type="text" 
                name="city"  
                defaultValue={this.state.user.address.city}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label>State</Label>
              <Input 
                type="text" 
                name="state"
                defaultValue={this.state.user.address.state}
                onChange={() => this.onAddressChangeHandler(event)} required />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Zip</Label>
              <Input 
                type="text" 
                name="zip" 
                defaultValue={this.state.user.address.zip}
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
