import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { updateUserSC } from '../../actions/profile/sc.profile.actions';
import { IAddress } from '../../model/address.model';
import { cognitoRoles } from '../../model/cognito-user.model';
import { IStatus } from '../../model/status.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { IAddressState, IStatusState } from '../../reducers/management';
import SCProfileStatusDropdown from './sc-profile.status.dropdown';
import SCProfileTrainingLocationButton from './sc-profile.training.location.dropdown';


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

export interface ISCProfileProps {
    currentSMSUser: IUser,
    trainingAddresses: IAddressState,
    userStatus: IStatusState,
    userToUpdate?: IUser, // This prop tells the component to look at a user other than the current user
    updateUserSC: (userToUpdate: IUser, prevUser: IUser) => any
}

interface ISCProfileState {
    updateUser: IUser
    trainingAddresses: IAddress[]
    userStatus: IStatus[]
    modal: boolean
}

export class SCProfile extends React.Component<ISCProfileProps, ISCProfileState> {

    constructor(props) {
        super(props);
        this.state = {
            trainingAddresses: [],
            userStatus: [],
            modal: false,
            updateUser: {
                email: '',
                userId: 0,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                trainingAddress: {
                    addressId: 0,
                    street: '',
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    zip: ''
                },
                personalAddress: {
                    addressId: 0,
                    street: '',
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    zip: ''
                },
                userStatus: {
                    statusId: 0,
                    generalStatus: '',
                    specificStatus: '',
                    virtual: false
                },
                roles: [],
            }
        }
        // this.onUpdateClick = this.onUpdateClick.bind(this);
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
            case inputNames.TRAINING_ALIASES:
                const newAddress = this.props.trainingAddresses.trainingAddresses.find((address: IAddress) => {
                    return address.alias === event.target.value;
                })
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        trainingAddress: newAddress || this.state.updateUser.trainingAddress
                    }
                })
                break;
            case inputNames.STATUS_ALIASES:
                const newStatus = this.props.userStatus.userStatus.find((status: IStatus) => {
                    return status.specificStatus === event.target.value;
                })
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...this.state.updateUser,
                        userStatus: newStatus || this.state.updateUser.userStatus
                    }
                })
                break;
            default:
                break;
        }
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (this.props.userToUpdate) {
            this.props.updateUserSC(this.state.updateUser, this.props.userToUpdate);
        } else {
            this.props.updateUserSC(this.state.updateUser, this.props.currentSMSUser);
        }
    }

    componentDidMount() {
        if (this.props.currentSMSUser) {
            this.setState({
                updateUser: this.props.currentSMSUser
            })
        }

        if (this.props.userToUpdate) {
            this.setState({
                updateUser: this.props.userToUpdate
            })
        }

        if (this.props.userStatus) {
            this.setState({
                userStatus: this.props.userStatus.userStatus
            })
        }

        if (this.props.trainingAddresses) {
            this.setState({
                trainingAddresses: this.props.trainingAddresses.trainingAddresses
            });
        }
    }

    componentDidUpdate(prevProps: ISCProfileProps, prevState: ISCProfileState) {
        if (!this.props.userToUpdate) {
            if (prevProps.currentSMSUser !== this.props.currentSMSUser) {
                this.setState({
                    updateUser: this.props.currentSMSUser
                })
            }
        }
        if (prevProps.trainingAddresses !== this.props.trainingAddresses) {
            this.setState({
                trainingAddresses: this.props.trainingAddresses.trainingAddresses
            })
        }
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                userStatus: this.props.userStatus.userStatus
            })
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name={inputNames.EMAIL}
                                value={this.state.updateUser && this.state.updateUser.email} readOnly />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <Label>Training Location</Label>
                        <SCProfileTrainingLocationButton
                            updateUser={this.state.updateUser}
                            changeHandler={this.onUserInfoChangeHandler} />
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
                        <Label>Status</Label>
                        <SCProfileStatusDropdown
                            updateUser={this.state.updateUser}
                            changeHandler={this.onUserInfoChangeHandler} />
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
                                            value="admin"
                                            checked={this.state.updateUser.roles.includes(cognitoRoles.ADMIN)} /> Admin
                                            </Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup checkedRoles>
                                    <Label roles>
                                        <Input
                                            type="checkbox"
                                            value="tranier"
                                            checked={this.state.updateUser.roles.includes(cognitoRoles.TRAINER)} /> Trainer
                                        </Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup checkedRoles>
                                    <Label roles>
                                        <Input
                                            type="checkbox"
                                            value="staging-manager"
                                            checked={this.state.updateUser.roles.includes(cognitoRoles.STAGING_MANAGER)} /> Staging Manager
                                        </Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup checkedRoles>
                                    <Label roles>
                                        <Input
                                            type="checkbox"
                                            value="associate"
                                            checked={!(this.state.updateUser.roles.includes(cognitoRoles.ADMIN)
                                                || this.state.updateUser.roles.includes(cognitoRoles.TRAINER)
                                                || this.state.updateUser.roles.includes(cognitoRoles.STAGING_MANAGER))} /> Associate
                                        </Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        <Button className="update-model" type='submit'>Update</Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.updateUser.userStatus.specificStatus !== 'Staging'
                        ? <>
                        </>
                        :
                        <Row style={{ margin: '2em' }}>
                            <Label>Virtual</Label>
                            <br />
                            <Input
                                type="checkbox"
                                checked={this.state.updateUser.userStatus.virtual}
                            // onChange={}
                            />
                        </Row>
                    }
                </Row>
            </Form>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    currentSMSUser: state.managementState.currentSMSUser.currentSMSUser,
    trainingAddresses: state.managementState.addresses,
    userStatus: state.managementState.statuses
})

const mapDispatchToProps = {
    updateUserSC
}

export default connect(mapStateToProps, mapDispatchToProps)(SCProfile);