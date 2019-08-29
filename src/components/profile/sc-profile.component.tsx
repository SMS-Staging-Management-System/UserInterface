import React from 'react';
import {
    Container, Form, Row, FormGroup, Label, Input,
    Col, Button, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';
import { IUser } from '../../model/user.model';
import { IAddressState, IStatusState } from '../../reducers/management';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { IAddress } from '../../model/address.model';


export const inputNames = {
    EMAIL: 'NEW_USER_EMAIL',
    FIRST_NAME: 'NEW_USER_FIRST_NAME',
    LAST_NAME: 'NEW_USER_LAST_NAME',
    PHONE: 'NEW_USER_PHONE',
    STREET: 'STREET',
    CITY: 'CITY',
    STATE: 'STATE',
    COUNTRY: 'COUNTRY',
    ZIP: 'ZIP',
    TRAINING_ALIASES: 'TRAINING_ALIASES',
    STATUS_ALIASES: 'STATUS_ALIASES'
}

interface ISCProfileProps {
    currentSMSUser: IUser,
    userToView: IUser,
    trainingAddresses: IAddressState,
    allStatus: IStatusState,
    locationDropdownActive: boolean,
    statusDropdownActive: boolean,
    bUserInfoChanged: boolean,
    virtual: boolean,
    location: any
}

interface ISCProfileState {
    updateUser: IUser
    trainingAddresses: IAddress[]
}

export class SCProfile extends React.Component<ISCProfileProps, ISCProfileState> {

    constructor(props) {
        super(props);
        this.state = {
            updateUser: this.props.currentSMSUser,
            trainingAddresses: []
            // isAdmin: this.props.userToView.roles.some(roles => roles.includes('admin')),
            // isTrainer: this.props.userToView.roles.some(roles => roles.includes('trainer')),
            // isStagingManager: this.props.userToView.roles.some(roles => roles.includes('staging-manager')),
            // isAssociate: this.props.userToView.roles.some(roles => roles.includes(''))
        }

        // this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    componentDidUpdate(prevProps: ISCProfileProps, prevState: ISCProfileState) {
        if (prevProps.currentSMSUser !== this.props.currentSMSUser) {
            this.setState({
                updateUser: this.props.currentSMSUser
            })
        }
        if (prevProps.trainingAddresses !== this.props.trainingAddresses) {
            this.setState({
                trainingAddresses: this.props.trainingAddresses.trainingAddresses
            })
        }
    }

    onUserInfoChangeHandler = (event: any) => {
        switch (event.target.name) {
            case inputNames.EMAIL:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        email: event.target.value
                    }
                })
                break;
            case inputNames.FIRST_NAME:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        firstName: event.target.value
                    }
                })
                break;
            case inputNames.LAST_NAME:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        lastName: event.target.value
                    }
                })
                break;
            case inputNames.PHONE:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        phoneNumber: event.target.value
                    }
                })
                break;
            case inputNames.STREET:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        personalAddress: {
                            ...this.state.updateUser.personalAddress,
                            street: event.target.value
                        }
                    }
                })
                break;
            case inputNames.CITY:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        personalAddress: {
                            ...this.state.updateUser.personalAddress,
                            city: event.target.value
                        }
                    }
                })
                break;
            case inputNames.STATE:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        personalAddress: {
                            ...this.state.updateUser.personalAddress,
                            state: event.target.value
                        }
                    }
                })
                break;
            case inputNames.ZIP:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        personalAddress: {
                            ...this.state.updateUser.personalAddress,
                            zip: event.target.value
                        }
                    }
                })
                break;
            case inputNames.COUNTRY:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        personalAddress: {
                            ...this.state.updateUser.personalAddress,
                            country: event.target.value
                        }
                    }
                })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name=""
                                        value={this.state.updateUser && this.state.updateUser.email} readOnly />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Label>Training Location</Label>
                                {this.state.updateUser.roles.length === 0 ?
                                    <p><strong>{this.state.updateUser.trainingAddress && this.state.updateUser.trainingAddress.alias}</strong></p>
                                    :
                                    <UncontrolledDropdown caret>
                                        <DropdownToggle>
                                            {this.state.updateUser.trainingAddress && this.state.updateUser.trainingAddress.alias || 'No Location'}
                                        </DropdownToggle>
                                        <DropdownMenu name={inputNames.TRAINING_ALIASES}>
                                            {
                                                this.state.trainingAddresses.length === 0
                                                    ? <>
                                                        <DropdownItem>Unable To Find Any Locations</DropdownItem>
                                                    </>
                                                    : this.state.trainingAddresses.map(location =>
                                                        <DropdownItem
                                                            key={location.addressId}
                                                        // onClick={() => this.props.updateUserTrainingLocation(location)}
                                                        >
                                                            {location.alias}
                                                        </DropdownItem>

                                                    )
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.FIRST_NAME}
                                        value={this.state.updateUser.firstName}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} required />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.LAST_NAME}
                                        value={this.state.updateUser.lastName}
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
                                        value={this.state.updateUser.phoneNumber}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label>Street</Label>
                            <Input
                                type="text"
                                name={inputNames.STREET}
                                value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.street}
                                onChange={(event) => this.onUserInfoChangeHandler(event)} />
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>City</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.CITY}
                                        value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.city}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>State</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.STATE}
                                        value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.state}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <Label>Zip</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.ZIP}
                                        value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.zip}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Country</Label>
                                    <Input
                                        type="text"
                                        name={inputNames.COUNTRY}
                                        value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.country}
                                        onChange={(event) => this.onUserInfoChangeHandler(event)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <Col>
                                        <Label>Status:</Label>

                                    </Col>
                                </Row>
                                <Row style={{ margin: '2em' }}>
                                    <Label>Virtual:</Label>
                                    <br />
                                    <Input
                                        type="checkbox"
                                        checked={this.state.updateUser.userStatus.virtual}
                                    // onChange={}
                                    />
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Label>Roles</Label>
                                <br />
                                <Row style={{ margin: '1em' }}>
                                    <Col md={3}>
                                        <FormGroup checkedRoles>
                                            <Label roles>
                                                <Input
                                                    type="checkbox"
                                                    value="admin" /> Admin
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup checkedRoles>
                                            <Label roles>
                                                <Input
                                                    type="checkbox"
                                                    value="tranier" /> Trainer
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup checkedRoles>
                                            <Label roles>
                                                <Input
                                                    type="checkbox"
                                                    value="staging-manager" /> Staging Manager
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup checkedRoles>
                                            <Label roles>
                                                <Input
                                                    type="checkbox"
                                                    value="associate" /> Associate
                                        </Label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <br />
                                <Button className="update-model">Update</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    trainingAddresses: state.managementState.addresses
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SCProfile);