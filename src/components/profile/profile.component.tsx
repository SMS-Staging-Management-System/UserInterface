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
                <Input type="email" name="email" id="currentSMSUserEmail" value={this.props.user.email} />
              </FormGroup>
             </Col>
             <Col md={4}>
              <FormGroup>
                <Label for="currentSMSUserFirstname">Firstname</Label>
                <Input type="text" name="firstName" id="currentSMSUserFirstname" defaultValue={this.props.user.firstName} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="currentSMSUserLastname">Lastname</Label>
                <Input type="text" name="lastName" id="currentSMSUserLastname" defaultValue={this.props.user.lastName} />
              </FormGroup>
            </Col>
          </Row>
        <FormGroup>
          <Label for="currentSMSUserAddress">Address</Label>
          <Input type="text" name="address" id="currentSMSUserAddress" defaultValue={this.props.user.address.street}/>
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="currentSMSUserCity">City</Label>
              <Input type="text" name="city" id="currentSMSUserCity" defaultValue={this.props.user.address.city}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="currentSMSUserState">State</Label>
              <Input type="text" name="state" id="currentSMSUserState" defaultValue={this.props.user.address.state}/>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="currentSMSUserZip">Zip</Label>
              <Input type="text" name="zip" id="currentSMSUserState" defaultValue={this.props.user.address.zip}/>
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
