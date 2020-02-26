import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { updateUser } from '../../actions/profile/profile.actions';
import { IAddress } from '../../model/users/IAddress';
import { IStatus } from '../../model/users/IStatus';
import { IUser } from '../../model/users/IUser';
import { IState } from '../../reducers';
import LocationDropdown from './location.dropdown';
import RoleSelector from './role.selector';
import SCProfileStatusDropdown from './status.dropdown';
import { Link } from 'react-router-dom';



export const inputNames = {
    CITY: 'city',
    COUNTRY: 'country',
    EMAIL: 'email',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    PHONE: 'phoneNumber',
    ROLES: 'roles',
    STATE: 'state',
    STATUS_ALIASES: 'statusAlias',
    STREET: 'street',
    TRAINING_ALIASES: 'trainingAlias',
    VIRTUAL_CHECKBOX: 'virtualCheckbox',
    ZIP: 'zip',
}

export interface IProfileProps {
    currentSMSUser: IUser,
    trainingAddresses: IAddress[],
    userStatus: IStatus[],
    userToUpdate?: IUser, // This prop tells the component to look at a user other than the current user
    // tslint:disable-next-line: bool-param-default
    updateUser: (userToUpdate: IUser, prevUser: IUser, isCurrentUser?: boolean) => any
}

interface IProfileState {
    updateUser: IUser
    trainingAddresses: IAddress[]
    userStatus: IStatus[]
}

export const blankUser = {
    email: '',
    firstName: '',
    lastName: '',
    personalAddress: {
        addressId: 0,
        alias: '',
        city: '',
        country: '',
        state: '',
        street: '',
        zip: ''
    },
    phoneNumber: '',
    roles: [],
    trainingAddress: {
        addressId: 0,
        alias: '',
        city: '',
        country: '',
        state: '',
        street: '',
        zip: ''
    },
    userId: 0,
    userStatus: {
        generalStatus: '',
        specificStatus: '',
        statusId: 0,
        virtual: false
    }
}

export class Profile extends React.Component<IProfileProps, IProfileState> {

    constructor(props) {
        super(props);
        this.state = {
            trainingAddresses: [],
            updateUser: blankUser,
            userStatus: [],
        }
    }

    handleInputChange = (event: any) => {
        const user = this.state.updateUser;
        const target = event.target.value;
        const name = event.target.name;
        const address = !user[name];

        if (address) {
            this.setState({
                updateUser: {
                    ...user,
                    personalAddress: {
                        ...user.personalAddress,
                        [name]: target
                    }
                }
            })
        } else {
            this.setState({
                updateUser: {
                    ...user,
                    [name]: target
                }
            })
        }
    }

    handleClickChange = (event: any) => {
        const target = event.target.value;
        const user = this.state.updateUser;
        switch (event.target.name) {
            case inputNames.TRAINING_ALIASES:
                const newAddress = this.props.trainingAddresses.find((address: IAddress) => {
                    return address.alias === target;
                })
                this.setState({
                    updateUser: {
                        ...user,
                        trainingAddress: newAddress || user.trainingAddress
                    }
                })
                break;
            case inputNames.STATUS_ALIASES:
                const newStatus = (this.props.userStatus.find((status: IStatus) => {
                    return status.specificStatus === target;
                })) || user.userStatus
                this.setState({
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
                const newVirtual = (this.props.userStatus.find((status: IStatus) => {
                    return (status.specificStatus === user.userStatus.specificStatus && status.virtual === !user.userStatus.virtual)
                }))
                this.setState({
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
                        roles = roles.filter(role => role !== target);
                    } else {
                        roles.push(target);
                    }
                }
                this.setState({
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
            this.props.updateUser(this.state.updateUser, this.props.userToUpdate);
        } else {
            this.props.updateUser(this.state.updateUser, this.props.currentSMSUser, true);
        }
    }

    componentDidMount() {
        if (this.props.currentSMSUser) {
            this.setState({
                updateUser: {
                    ...this.props.currentSMSUser,
                    roles: this.props.currentSMSUser.roles.slice(0) // This creates a copy of the array, rather than a copy of the references stored in the array
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
                userStatus: this.props.userStatus
            })
        }

        if (this.props.trainingAddresses) {
            this.setState({
                trainingAddresses: this.props.trainingAddresses
            });
        }
    }

    componentDidUpdate(prevProps: IProfileProps, prevState: IProfileState) {
        if (!this.props.userToUpdate && prevProps.currentSMSUser !== this.props.currentSMSUser) {
            this.setState({
                updateUser: {
                    ...this.props.currentSMSUser,
                    roles: this.props.currentSMSUser.roles.slice(0)
                }
            })
        }
        if (prevProps.trainingAddresses !== this.props.trainingAddresses) {
            this.setState({
                trainingAddresses: this.props.trainingAddresses
            })
        }
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                userStatus: this.props.userStatus
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
                            {/* <Button href="management/send-email">Change Password</Button> */}

                            <Link to="/management/send-email">
                             <button style={{marginTop: "12px"}} type="button">
                                 Change Password
                            </button>
                            </Link>
                          
                    </Col>
                           
                            
                    <Col md={4}>
                        <Label>Training Location</Label>
                        <LocationDropdown
                            updateUser={this.state.updateUser}
                            changeHandler={this.handleClickChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            name={inputNames.FIRST_NAME}
                            value={this.state.updateUser.firstName}
                            onChange={this.handleInputChange} required />
                    </Col>
                    <Col md={4}>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            name={inputNames.LAST_NAME}
                            value={this.state.updateUser.lastName}
                            onChange={this.handleInputChange} required />
                    </Col>
                    <Col md={4}>
                        <Label>Phone Number</Label>
                        <Input
                            type="tel"
                            pattern="^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$"
                            name={inputNames.PHONE}
                            value={this.state.updateUser.phoneNumber}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Label>Street</Label>
                        <Input
                            type="text"
                            name={inputNames.STREET}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.street}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>City</Label>
                        <Input
                            type="text"
                            name={inputNames.CITY}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.city}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={3}>
                        <Label>State</Label>
                        <Input
                            type="text"
                            name={inputNames.STATE}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.state}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={2}>
                        <Label>Zip</Label>
                        <Input
                            type="text"
                            name={inputNames.ZIP}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.zip}
                            onChange={this.handleInputChange} />
                    </Col>
                    <Col md={3}>
                        <Label>Country</Label>
                        <Input
                            type="text"
                            name={inputNames.COUNTRY}
                            value={this.state.updateUser.personalAddress && this.state.updateUser.personalAddress.country}
                            onChange={this.handleInputChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Label>Status</Label>
                        <SCProfileStatusDropdown
                            updateUser={this.state.updateUser}
                            changeHandler={this.handleClickChange} />
                        {this.state.updateUser.userStatus.generalStatus === 'Training'
                            ? <></>
                            :
                            <>
                                <FormGroup className="m-0" check inline>
                                    <Input
                                        className="m-0"
                                        type="checkbox"
                                        name={inputNames.VIRTUAL_CHECKBOX}
                                        onChange={this.handleClickChange}
                                        checked={this.state.updateUser.userStatus.virtual} />
                                </FormGroup>
                                {' Virtual'}
                            </>}
                    </Col>
                    <Col md={8}>
                        <Label>Roles</Label>
                        <br />
                        <RoleSelector
                            updateUser={this.state.updateUser}
                            onChangeHandler={this.handleClickChange} />
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
    trainingAddresses: state.managementState.addresses.trainingAddresses,
    userStatus: state.managementState.statuses.userStatus
})

const mapDispatchToProps = {
    updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
