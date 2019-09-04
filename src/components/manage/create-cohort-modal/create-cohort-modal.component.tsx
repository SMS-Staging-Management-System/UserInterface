import * as React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    InputGroup, InputGroupText, InputGroupAddon, Input,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICreateCohortModal } from './create-cohort-modal.container';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ICognitoUser, cognitoRoles } from '../../../model/cognito-user.model';
import { cognitoClient } from '../../../axios/sms-clients/cognito-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { toast } from "react-toastify";

const inputNames = {
    DESCRIPTION: 'NEW_COHORT_DESCRIPTION',
    NAME: 'NEW_COHORT_NAME',
    START_DATE: 'NEW_START_DATE',
    // tslint:disable-next-line: object-literal-sort-keys
    END_DATE: 'NEW_END_DATE'
}

interface ICreateCohortStateNotRedux {
    trainers ?: ICognitoUser[],
}

export class CreateCohortModal extends React.Component<ICreateCohortModal, ICreateCohortStateNotRedux> {
    constructor(props: ICreateCohortModal) {
        super(props);
        this.state = {
            trainers: [],
        }
        this.getTrainers = this.getTrainers.bind(this);
    }

    async componentDidMount() {
        this.props.updateLocations();
        const trainerList = await this.getTrainers();
        this.setState({
            trainers: trainerList,
        })
    }

    // This function will call the cognito and database to get the trainer info.
    async getTrainers() {
        try {
            const trainerResponse = await cognitoClient.findUsersByGroup(cognitoRoles.TRAINER);

            const userMap = new Map<string, ICognitoUser>();

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < trainerResponse.data.Users.length; i++) {
                const currentCognitoUser = trainerResponse.data.Users[i];
                const currentEmail = currentCognitoUser.Attributes.find((attr: any) => attr.Name === 'email').Value;
                const mapUser = userMap.get(currentEmail)
                let newUser: ICognitoUser = mapUser ? mapUser : {
                    email: currentEmail,
                    roles: []
                };
                newUser.roles.push(cognitoRoles.TRAINER);
                userMap.set(newUser.email, newUser);
            }
            // change map to array
            const mapArray = Array.from(userMap);
            let userArray = new Array<ICognitoUser>();
            userArray = mapArray.map(entry => entry[1]);

            // add user names
            const emailList: string[] = userArray.map(user => user.email)
            const userInfoResp = await userClient.findAllByEmailsNotPageable(emailList);

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < userInfoResp.data.length; i++) {
                const respEmail = userInfoResp.data[i].email;
                // tslint:disable-next-line: prefer-for-of
                for (let j = 0; j < userArray.length; j++) {
                    if (userArray[j].email === respEmail) {
                        userArray[j].firstName = userInfoResp.data[i].firstName;
                        userArray[j].lastName = userInfoResp.data[i].lastName;
                    }
                }
            }
            return userArray;

        } catch (e) {
            toast.warn('Unable to retreive trainers');
            return [];
        }
    }

    updateNewCohortInfo = (e) => {
        let updatedNewCohort = this.props.createCohort.newCohort;
        const target = e.target as HTMLSelectElement;
        const changeValue = e as React.ChangeEvent<HTMLInputElement>;
        console.log(changeValue.target.value);
        switch (target.name) {
            case inputNames.DESCRIPTION:
                updatedNewCohort = {
                    ...updatedNewCohort,
                    cohortDescription: changeValue.target.value
                }
                break;
            case inputNames.NAME:
                updatedNewCohort = {
                    ...updatedNewCohort,
                    cohortName: changeValue.target.value
                }
                break;
            case inputNames.START_DATE:
                updatedNewCohort = {
                    ...updatedNewCohort,
                    startDate: changeValue.target.value
                }
                break;
            case inputNames.END_DATE:
                updatedNewCohort = {
                    ...updatedNewCohort,
                    endDate: changeValue.target.value
                }
                break;
            default:
                break;
        }
        console.log(updatedNewCohort);
        this.props.updateNewCohort(updatedNewCohort)
        console.log(updatedNewCohort);
    }

    saveNewCohort = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('saving')
        this.props.saveCohort(this.props.createCohort.newCohort);
    }

    // goToCohortPage = (window, createCohort) => {
    //     const cohortLocation = `${window.location.origin.toString()}` +
    //         `/management/joincohort/${createCohort.newCohort.cohortToken}`;


    // }

    getNewCohortJoinPath = (window, createCohort) => {
        return `${window.location.origin.toString()}` +
            `/management/joincohort/${createCohort.newCohort.cohortToken}`;
    }

    render() {

        const { createCohort, addresses, /*manageUsers*/ } = this.props;

        console.log(this.state.trainers);

        return (
            <Modal isOpen={createCohort.enabled}>
                <form onSubmit={this.saveNewCohort}>
                    <ModalHeader className="rev-background-color">Create Cohort</ModalHeader>
                    <ModalBody>
                        <div className="responsive-modal-row">
                            <InputGroup className="responsive-modal-row-item">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Name</InputGroupText>
                                </InputGroupAddon>
                                <Input name={inputNames.NAME}
                                    onChange={this.updateNewCohortInfo}
                                    value={createCohort.newCohort.cohortName}
                                    valid={!!createCohort.newCohort.cohortName}
                                    invalid={!createCohort.newCohort.cohortName} />
                            </InputGroup>
                            <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                                isOpen={this.props.createCohort.locationDropdownActive}
                                toggle={this.props.toggleLocationDropdown}>
                                <DropdownToggle caret>
                                    {createCohort.newCohort.address.alias || 'Location'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {
                                        addresses.trainingAddresses.length === 0
                                            ? <>
                                                <DropdownItem>Unable To Find Any Locations</DropdownItem>
                                                <DropdownItem divider />
                                            </>
                                            : addresses.trainingAddresses.map(location =>
                                                <DropdownItem key={location.addressId} onClick={() => this.props.updateNewCohortLocation(location)}>{location.alias}</DropdownItem>
                                            )
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="responsive-modal-row">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">start</InputGroupAddon>
                                <Input name={inputNames.START_DATE} type="date" placeholder="date"
                                    value={createCohort.newCohort.startDate}
                                    onChange={this.updateNewCohortInfo}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">end</InputGroupAddon>
                                <Input name={inputNames.END_DATE} type="date" placeholder="date"
                                    value={createCohort.newCohort.endDate}
                                    onChange={this.updateNewCohortInfo}
                                />
                            </InputGroup>
                        </div>
                        <div className="responsive-modal-row">
                            <textarea name={inputNames.DESCRIPTION}
                                className="responsive-modal-row-item"
                                placeholder="Description"
                                onChange={this.updateNewCohortInfo}
                                value={createCohort.newCohort.cohortDescription}
                                required />
                        </div>
                        <div>
                            {this.state.trainers && <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                                isOpen={this.props.createCohort.trainerDropdownActive}
                                toggle={this.props.toggleTrainerDropdown}>
                                <DropdownToggle caret>
                                    {createCohort.newCohort.trainer.email ? createCohort.newCohort.trainer.firstName + ' ' + createCohort.newCohort.trainer.lastName : 'Trainer'}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {
                                        this.state.trainers.length === 0
                                            ? <>
                                                <DropdownItem>No trainers available</DropdownItem>
                                                <DropdownItem divider />
                                            </>
                                            : this.state.trainers.map(trainer =>
                                                <DropdownItem key={trainer.email} onClick={() => this.props.updateNewCohortTrainer(trainer)}>{trainer.firstName + ' ' + trainer.lastName}</DropdownItem>
                                            )
                                    }
                                </DropdownMenu>
                            </Dropdown>}
                        </div>
                        <div>
                            {createCohort.isSaved &&
                                <div className="responsive-modal-row">
                                    link: <Input className="horizontal-scroll"
                                        disabled value={this.getNewCohortJoinPath(window, createCohort)}></Input>
                                    <CopyToClipboard
                                        text={this.getNewCohortJoinPath(window, createCohort)}>
                                        <Button>Copy</Button>
                                    </CopyToClipboard>
                                </div>
                            }
                            <br />
                        </div>
                    </ModalBody>
                    <ModalFooter id="create-Cohort-modal-footer">
                        <div>{createCohort.isSaved && 'saved'}</div>
                        <Button type="submit"
                            className="rev-btn"
                            disabled={createCohort.isSaved}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggleModal}>{createCohort.isSaved ? 'Close' : 'Cancel'}</Button>
                    </ModalFooter>
                </form>
            </Modal >

        );
    }
}

