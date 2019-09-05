import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { updateUserSC } from '../../actions/profile/sc.profile.actions';
import { IAddress } from '../../model/address.model';
import { IStatus } from '../../model/status.model';
import { IUser } from '../../model/user.model';
import { IState } from '../../reducers';
import { IAddressState, IStatusState } from '../../reducers/management';
import SCLocationDropdown from './sc-location.dropdown';
import SCRoleSelector from './sc-role.selector';
import SCProfileStatusDropdown from './sc-status.dropdown';


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
    STATUS_ALIASES: 'STATUS_ALIASES',
    VIRTUAL_CHECKBOX: 'VIRTUAL_CHECKBOX',
    ROLES: 'ROLES'
}

export interface ISCProfileProps {
    currentSMSUser: IUser,
    trainingAddresses: IAddressState,
    userStatus: IStatusState,
    userToUpdate?: IUser, // This prop tells the component to look at a user other than the current user
    updateUserSC: (userToUpdate: IUser, prevUser: IUser, isCurrentUser?: boolean) => any
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
        const target = event.target.value
        const user = this.state.updateUser;
        switch (event.target.name) {
            case inputNames.EMAIL:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        email: target
                    }
                })
                break;
            case inputNames.FIRST_NAME:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        firstName: target
                    }
                })
                break;
            case inputNames.LAST_NAME:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        lastName: target
                    }
                })
                break;
            case inputNames.PHONE:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        phoneNumber: target
                    }
                })
                break;
            case inputNames.STREET:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        personalAddress: {
                            ...user.personalAddress,
                            street: target
                        }
                    }
                })
                break;
            case inputNames.CITY:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        personalAddress: {
                            ...user.personalAddress,
                            city: target
                        }
                    }
                })
                break;
            case inputNames.STATE:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        personalAddress: {
                            ...user.personalAddress,
                            state: target
                        }
                    }
                })
                break;
            case inputNames.ZIP:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        personalAddress: {
                            ...user.personalAddress,
                            zip: target
                        }
                    }
                })
                break;
            case inputNames.COUNTRY:
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        personalAddress: {
                            ...user.personalAddress,
                            country: target
                        }
                    }
                })
                break;
            case inputNames.TRAINING_ALIASES:
                const newAddress = this.props.trainingAddresses.trainingAddresses.find((address: IAddress) => {
                    return address.alias === target;
                })
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        trainingAddress: newAddress || user.trainingAddress
                    }
                })
                break;
            case inputNames.STATUS_ALIASES:
                const newStatus = (this.props.userStatus.userStatus.find((status: IStatus) => {
                    return status.specificStatus === target;
                })) || user.userStatus
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        userStatus: {
                            ...newStatus,
                            virtual: (newStatus.generalStatus === 'Training') ? false : user.userStatus.virtual
                        }
                    }
                })
                break;
            case inputNames.VIRTUAL_CHECKBOX:
                const newVirtual = (this.props.userStatus.userStatus.find((status: IStatus) => {
                    return (status.specificStatus === user.userStatus.specificStatus && status.virtual === !user.userStatus.virtual)
                }))
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        userStatus: {
                            ...newVirtual!
                        }
                    }
                })
                break;
            case inputNames.ROLES:
                let roles: string[] = [];
                if (target !== 'associate') {
                    roles = user.roles
                    if (roles.includes(target)) {
                        roles = roles.filter(role => { return role !== target });
                    } else {
                        roles.push(target);
                    }
                }
                this.setState({
                    ...this.state,
                    updateUser: {
                        ...user,
                        roles
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
            this.props.updateUserSC(this.state.updateUser, this.props.currentSMSUser, true);
        }
    }

    componentDidMount() {
        if (this.props.currentSMSUser) {
            this.setState({
                updateUser: {
                    ...this.props.currentSMSUser,
                    roles: this.props.currentSMSUser.roles.slice(0)
                }
            })
        }

        if (this.props.userToUpdate) {
            this.setState({
                updateUser: {
                    ...this.props.userToUpdate,
                    roles: this.props.userToUpdate.roles.slice(0)
                },
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
                    updateUser: {
                        ...this.props.currentSMSUser,
                        roles: this.props.currentSMSUser.roles.slice(0)
                    }
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
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name={inputNames.EMAIL}
                            value={this.state.updateUser && this.state.updateUser.email} readOnly />
                    </Col>
                    <Col md={4}>
                        <Label>Training Location</Label>
                        <SCLocationDropdown
                            updateUser={this.state.updateUser}
                            changeHandler={this.onUserInfoChangeHandler} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            name={inputNames.FIRST_NAME}
                            value={this.state.updateUser.firstName}
                            onChange={this.onUserInfoChangeHandler} required />
                    </Col>
                    <Col md={4}>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            name={inputNames.LAST_NAME}
                            value={this.state.updateUser.lastName}
                            onChange={this.onUserInfoChangeHandler} required />
                    </Col>
                    <Col md={4}>
                        <Label>Phone Number</Label>
                        <Input
                            type="tel"
                            pattern="^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$"
                            name={inputNames.PHONE}
                            value={this.state.updateUser.phoneNumber}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Label>Street</Label>
                        <Input
                            type="text"
                            name={inputNames.STREET}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.street}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>City</Label>
                        <Input
                            type="text"
                            name={inputNames.CITY}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.city}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                    <Col md={3}>
                        <Label>State</Label>
                        <Input
                            type="text"
                            name={inputNames.STATE}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.state}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                    <Col md={2}>
                        <Label>Zip</Label>
                        <Input
                            type="text"
                            name={inputNames.ZIP}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.zip}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                    <Col md={3}>
                        <Label>Country</Label>
                        <Input
                            type="text"
                            name={inputNames.COUNTRY}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.country}
                            onChange={this.onUserInfoChangeHandler} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>Status</Label>
                        <SCProfileStatusDropdown
                            updateUser={this.state.updateUser}
                            onChangeHandler={this.onUserInfoChangeHandler} />
                        {this.state.updateUser.userStatus.generalStatus === 'Training'
                            ? <></>
                            :
                            <>
                                <FormGroup className="m-0" check inline>
                                    <Input
                                        className="m-0"
                                        type="checkbox"
                                        name={inputNames.VIRTUAL_CHECKBOX}
                                        onChange={this.onUserInfoChangeHandler}
                                        checked={this.state.updateUser.userStatus.virtual} />
                                </FormGroup>
                                {' Virtual'}
                            </>}
                    </Col>
                    <Col md={8}>
                        <Label>Roles</Label>
                        <br />
                        <SCRoleSelector
                            updateUser={this.state.updateUser}
                            onChangeHandler={this.onUserInfoChangeHandler} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="update-model" type='submit'>Update</Button>
                    </Col>
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