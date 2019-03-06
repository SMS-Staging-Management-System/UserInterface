import  React, { Component } from 'react';
import { IUser } from '../../model/user.model';
import { Container, Form, Row, FormGroup, Label, Input, Col, Button } from 'reactstrap';

interface IProfileProps {
  user: IUser
}

class Profile extends Component<IProfileProps, any> {
  render() {
    return (
      <Container>
        <Form>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="currentSMSUserEmail">Email</Label>
                <Input type="email" name="email" id="currentSMSUserEmail" placeholder={this.props.user.email} />
              </FormGroup>
             </Col>
             <Col md={4}>
              <FormGroup>
                <Label for="currentSMSUserFirstname">Firstname</Label>
                <Input type="text" name="firstName" id="currentSMSUserFirstname" placeholder={this.props.user.firstName} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="currentSMSUserLastname">Lastname</Label>
                <Input type="text" name="lastName" id="currentSMSUserLastname" placeholder={this.props.user.lastName} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label for="currentSMSUserAddress">Address</Label>
          <Input type="text" name="address" id="currentSMSUserAddress" placeholder="1234 Main St"/>
        </FormGroup>
        <FormGroup>
          <Label for="currentSMSUserAddress2">Address 2</Label>
          <Input type="text" name="address2" id="currentSMSUserAddress2" placeholder="Apartment, studio, or floor"/>
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="currentSMSUserCity">City</Label>
              <Input type="text" name="city" id="currentSMSUserCity" placeholder={this.props.user.address.city}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="currentSMSUserState">State</Label>
              <Input type="text" name="state" id="currentSMSUserState" placeholder={this.props.user.address.state}/>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="currentSMSUserZip">Zip</Label>
              <Input type="text" name="zip" id="currentSMSUserState" placeholder={this.props.user.address.zip}/>
            </FormGroup>  
          </Col>
        </Row>
        <Button >Update</Button>
      </Form>
      </Container>
    )
  }
}

export default Profile;
