import React, { Component, FormEvent } from 'react';
import {
    Container, Form, Row, FormGroup, Label, Input,
    Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { IAddress } from '../../model/address.model';
import { IProfileProps } from './profile.container';
import { cognitoRoles } from '../../model/cognito-user.model';


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

export interface IProfileState {
    isAdmin: boolean;
    isTrainer: boolean;
    isStagingManager: boolean;
    isAssociate: boolean;
}

class Profile extends Component<IProfileProps, IProfileState> {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: this.props.userToView.roles.some(roles => roles.includes('admin')),
            isTrainer: this.props.userToView.roles.some(roles => roles.includes('trainer')),
            isStagingManager: this.props.userToView.roles.some(roles => roles.includes('staging-manager')),
            isAssociate: this.props.userToView.roles.some(roles => roles.includes(''))
        }

        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    async componentDidMount() {
        await this.resetRoleState();
    }

    async resetRoleState() {
        await this.setState({
            isAdmin: this.props.userToView.roles.some(roles => roles.includes('admin')),
            isTrainer: this.props.userToView.roles.some(roles => roles.includes('trainer')),
            isStagingManager: this.props.userToView.roles.some(roles => roles.includes('staging-manager')),
            isAssociate: !(this.props.userToView.roles.includes('admin') ||
                this.props.userToView.roles.includes('staging-manager') ||
                this.props.userToView.roles.includes('trainer'))
        });
    }

    async onUpdateClick() {
        await this.props.updateUser(this.props.userToView, this.props.bUserInfoChanged,
            [this.state.isAdmin, this.state.isTrainer, this.state.isStagingManager]);
        const resetRolesPromise = this.resetRoleState();
        await this.props.manageGetUsersByGroup(this.props.manageUsers.option, this.props.manageUsers.emailSearch, this.props.manageUsers.manageUsersCurrentPage);
        await resetRolesPromise;
    }


    onUserInfoChangeHandler = (event: React.FormEvent) => {
        let updatedUser = this.props.userToView;

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
                break;
            case inputNames.ZIP:
                updatedUser = {
                    ...updatedUser,
                    personalAddress: {
                        ...updatedUser.personalAddress,
                        zip: target.value
                    }
                }
                break;
            case inputNames.COUNTRY:
                updatedUser = {
                    ...updatedUser,
                    personalAddress: {
                        ...updatedUser.personalAddress,
                        country: target.value
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
        // legacy code
        // Why is forms even being used
    }

    trainingLocationListToggle = () => {
        this.props.toggleTrainingLocationsDropdown();
    }

    alterUserRole = (role: String) => {
        switch (role) {
            case cognitoRoles.ADMIN:
                this.setState({ isAdmin: !this.state.isAdmin })
                break;
            case cognitoRoles.TRAINER:
                this.setState({ isTrainer: !this.state.isTrainer })
                break;
            case cognitoRoles.STAGING_MANAGER:
                this.setState({ isStagingManager: !this.state.isStagingManager })
                break;
        }
    }

    render() {        
        const { userToView, trainingAddresses, allStatus, currentSMSUser } = this.props;
        let userToViewDetails
        if (this.props.location && this.props.location.state && this.props.location.state.currentUser) 
            userToViewDetails = currentSMSUser
        else userToViewDetails = userToView
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
                                    value={userToViewDetails.email} readOnly />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Label>Training Location</Label>
                            {this.props.currentSMSUser.roles.length === 0 ?
                                <p><strong>{userToViewDetails.trainingAddress && userToViewDetails.trainingAddress.alias}</strong></p>
                                :
                                <Dropdown
                                    color="success" className="responsive-modal-row-item rev-btn"
                                    isOpen={this.props.locationDropdownActive}
                                    toggle={this.props.toggleTrainingLocationsDropdown}>
                                    <DropdownToggle caret>
                                        {userToViewDetails.trainingAddress && userToViewDetails.trainingAddress.alias || 'No Location'}
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
                                    value={userToViewDetails.firstName}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} required />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    name={inputNames.LAST_NAME}
                                    value={userToViewDetails.lastName}
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
                                    value={userToViewDetails.phoneNumber}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Street</Label>
                        <Input
                            type="text"
                            name={inputNames.STREET}
                            value={userToViewDetails.personalAddress && userToViewDetails.personalAddress.street}
                            onChange={(event) => this.onUserInfoChangeHandler(event)} />
                    </FormGroup>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    name={inputNames.CITY}
                                    value={userToViewDetails.personalAddress && userToViewDetails.personalAddress.city}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>State</Label>
                                <Input
                                    type="text"
                                    name={inputNames.STATE}
                                    value={userToViewDetails.personalAddress && userToViewDetails.personalAddress.state}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label>Zip</Label>
                                <Input
                                    type="text"
                                    name={inputNames.ZIP}
                                    value={userToViewDetails.personalAddress && userToViewDetails.personalAddress.zip}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    name={inputNames.COUNTRY}
                                    value={userToViewDetails.personalAddress && userToViewDetails.personalAddress.country}
                                    onChange={(event) => this.onUserInfoChangeHandler(event)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Row>
                                <Col>
                                    <Label>Status:</Label>
                                    <Dropdown
                                        color="success" className="responsive-modal-row-item rev-btn"
                                        isOpen={this.props.statusDropdownActive}
                                        toggle={this.props.toggleStatusDropdown}>
                                        <DropdownToggle caret>
                                            {userToViewDetails.userStatus && userToViewDetails.userStatus.generalStatus && userToViewDetails.userStatus.specificStatus || 'No Status'}
                                        </DropdownToggle>
                                        <DropdownMenu name={inputNames.STATUS_ALIASES}>
                                            {
                                                allStatus.userStatus.length === 0
                                                    ? <>
                                                        <DropdownItem>Unable To Find Any Statuses</DropdownItem>
                                                        <DropdownItem divider />
                                                    </>
                                                    : allStatus.userStatus.filter(status => {
                                                        if (status.specificStatus === 'Training' || status.specificStatus === 'Dropped' || status.specificStatus === 'Complete') {
                                                            return true;
                                                        }
                                                        if (this.props.virtual) {
                                                            if (status.virtual) {
                                                                return true;
                                                            } else {
                                                                return false
                                                            }
                                                        } else {
                                                            if (!status.virtual) {
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }
                                                    }).map(status =>
                                                        <DropdownItem
                                                            key={status.statusId}
                                                            statusValue={status.specificStatus}
                                                            onClick={() => this.props.updateUserStatus(status)} >{status.specificStatus}</DropdownItem>
                                                    )
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ margin: '2em', }}>
                                <Label>Virtual:</Label>
                                <br />
                                <Input
                                    type="checkbox"
                                    checked={userToViewDetails.userStatus.virtual}
                                    onChange={() => this.props.handleCheckboxChange(this.props.allStatus.userStatus.filter(status => {
                                        if (status.specificStatus === userToViewDetails.userStatus.specificStatus && status.virtual !== userToView.userStatus.virtual) {
                                            return true;
                                        } else
                                            return false;
                                    })[0])}
                                />
                            </Row>
                        </Col>
                        <Col>
                            <Label>Roles</Label>
                            <br />
                            <FormGroup checkedRoles>
                                <Label Roles>
                                    <Input
                                        type="checkbox"
                                        value="admin"
                                        checked={this.state.isAdmin}
                                        onChange={(e) => this.alterUserRole(cognitoRoles.ADMIN)}
                                    /> Admin
                                </Label>
                            </FormGroup>
                            <FormGroup checkedRoles>
                                <Label Roles>
                                    <Input
                                        type="checkbox"
                                        value="trainer"
                                        checked={this.state.isTrainer}
                                        onChange={(e) => this.alterUserRole(cognitoRoles.TRAINER)}
                                    />Trainer
                                </Label>
                            </FormGroup>
                            <FormGroup checkedRoles>
                                <Label Roles>
                                    <Input
                                        type="checkbox"
                                        value="staging-manager"
                                        checked={this.state.isStagingManager}
                                        onChange={(e) => this.alterUserRole(cognitoRoles.STAGING_MANAGER)}
                                    />Staging-Manager
                                </Label>
                            </FormGroup>
                            <FormGroup checkedRoles>
                                <Label Roles>
                                    <Input
                                        type="checkbox"
                                        value="associtate"
                                        checked={this.state.isAssociate}
                                    />Associate
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <br />
                    <Button className="update-model"
                        onClick={this.onUpdateClick}>Update</Button>
                </Form>
            </Container>
        )
    }
}

export default Profile;
