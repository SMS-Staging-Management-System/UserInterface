import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { ICohort } from '../../../model/cohort';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import Loader from '../Loader/Loader';
import { inputNames } from '../../profile/profile.component';
import { IUser } from '../../../model/user.model';
import { statusClient } from '../../../axios/sms-clients/status-client';
import { IStatus } from '../../../model/status.model';
import Input from 'reactstrap/lib/Input';


interface IComponentProps {
    surveysToAssign: number[],
    buttonLabel: string,
    
}

interface IComponentState {
    cohortIdsToAssign: number[],
    cohortsLoaded: boolean,
    userArray: IUserCohortIdAndEmail[],
    usersLoaded: boolean,
    emailsToAssign: string[],
    modal: boolean,
    nameTextBox: string,
    addressId: number,
    sortCohorts: ICohort[],
    sortAlias: ICohort[],
    alias: string,
    totalPages: number,
    currentPage: number,
    allGeneralStatusUsers: IUserCohortIdAndEmail[],
    allSpecificStatusUsers: IUserCohortIdAndEmail[],
    statusDropdownActive: boolean,
    virtual: boolean,
    allUsers: IUser[],
    allStatus: IStatus[],
    allGeneralStatus: Set<string>,
    allSpecificStatus: Set<string>
}

interface IUserCohortIdAndEmail {
    id: number,
    email: string,
    generalStatus: string,
    specificStatus: string
}

class SurveyModal extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            cohortsLoaded: false,
            userArray: [],
            usersLoaded: false,
            cohortIdsToAssign: [],
            emailsToAssign: [],
            nameTextBox: '',
            addressId: 0,
            sortCohorts: [],
            sortAlias: [],
            alias: '',
            totalPages: 0,
            currentPage: 0,
            allGeneralStatusUsers: [],
            allSpecificStatusUsers: [],
            statusDropdownActive: false,
            virtual: false,
            allUsers: [],
            allStatus: [],
            allGeneralStatus: new Set,
            allSpecificStatus: new Set
            
        };
    }
    // show status dropdown 
    toggleStatusDropdown() {
        this.setState({
            statusDropdownActive: !this.state.statusDropdownActive
        });
    }
    // pagination
    async componentDidMount() {
        const data = await this.getAllCohorts(this.state.currentPage);
    }
    // componentDidMount() {
    //     // grabs all cohorts from database and loads them into
    //     //   the userArray, each having their cohort id and email address
    //     this.loadAllCohorts();
    // }
    // componentWillUpdate(nextProps, nextState){
    //     console.log("Hi")
    //     if(nextState !== this.state){
    //         console.log("QQQQ")
    //         if(nextState.sortCohorts.length === 0){
    //             console.log("Worked!")
    //             this.loadAllCohorts();
    //         }
    //     }
    // }
    //Function responsible for searching our cohorts by name , with the help of LIKE query to search anything that matches cohorts.
    searchByName = async (e) => {
        this.setState({
            nameTextBox: e.target.value
        });
        let newCohorts;
        console.log(e.target.value)
        if (e.target.value) {
            console.log("Hi")
            newCohorts = await cohortClient.getName(e.target.value);
        }
        //If no match occurs, and nothing is present in the textbox, list all the cohorts that currently exist.
        else {
            console.log("hello")
            const newCohortsResponse = await cohortClient.findAll();
            newCohorts = newCohortsResponse.data;
            console.log(newCohorts)
        }
        this.setState({
            sortCohorts: newCohorts
        });
    }
    //Function responsible for seearching our cohorts by address, based on where the cohorts are located.

    searchByAddressName = async (e) => {
        this.setState({
            alias: e.target.value
        });
        let newCohorts;
        console.log(e.target.value)
        if (e.target.value) {
            console.log("Hi")
            newCohorts = await cohortClient.getAlias(e.target.value);
        }
        //If no match occurs, and nothing is present in the textbox, list all the cohorts that currently exist.
        else {
            console.log("hello")
            const newCohortsResponse = await cohortClient.findAll();
            newCohorts = newCohortsResponse.data;
            console.log(newCohorts)
        }
        this.setState({
            sortCohorts: newCohorts
        })


    }

    getAllCohorts = async (newPage: number) => {
        let resp = await cohortClient.findAllByPage(newPage);
        console.log("response data");
        console.log(resp.data);
        console.log("after response");
        this.setState({
            sortCohorts: resp.data.content,
            currentPage: newPage,
            totalPages: resp.data.totalPages,
        });
        this.loadAllUserEmails();
        this.getAllGeneralStatus();
        this.loadAllUsersSinglePage();
    }
    // save all general status to allGeneralStatus state
    getAllGeneralStatus = async () => {
        let resp = await statusClient.findAllStatuses();
        this.setState({
            allStatus: resp.data
        });
        this.state.allStatus.forEach(status => {
            this.setState({
                allGeneralStatus: this.state.allGeneralStatus.add(status.generalStatus)
            });
        });
        console.log("all general status");
        console.log(this.state.allGeneralStatus);
        this.getAllSpecificStatus();
    }
    getAllSpecificStatus = () => {
        this.state.allStatus.forEach(status => {
            this.setState({
                allSpecificStatus: this.state.allSpecificStatus.add(status.specificStatus)
            });
        });
        console.log("all Specific status");
        console.log(this.state.allSpecificStatus);
    }
    // get all users
    loadAllUsersSinglePage = async () => {
        let resp = await userClient.findAllUsers(0);
        console.log('all users single page');
        console.log(resp.data);
        this.setState({
            allUsers: resp.data.content
        });
        this.loadAllUsersAllPages(resp.data.totalPages);
    }
    loadAllUsersAllPages = async (totalPages: number) => {
        for(let i = 1; i < totalPages; i++) {
            let resp = await userClient.findAllUsers(i);
            this.setState({
                allUsers: this.state.allUsers.concat(resp.data.content)
            })
        }
    } 
    loadAllCohorts = async () => {
        // get all cohorts
        const cohorts = await cohortClient.findAll();
        if (cohorts) {
            this.setState({
                sortCohorts: cohorts.data,
                cohortsLoaded: true
            },
                // then, only AFTER state is changed, load user emails according from cohort data
                () => {
                    this.loadAllUserEmails();
                });
        }
    }
    
    loadAllUserEmails = async () => {
        const { sortCohorts } = this.state;
        // set up array to dump into state 
        const idAndEmailArray: IUserCohortIdAndEmail[] = [];

        // for each cohort, get users
        for (const cohort of sortCohorts) {
            const users = await userClient.findAllByCohortId(cohort.cohortId);
            // for each array of users, load into array
            console.log("emails");
            console.log(users.data);
            for (const user of users.data) {
                // make object for each user to push to array
                const idAndEmailObj: IUserCohortIdAndEmail = {
                    id: cohort.cohortId,
                    email: user.email,
                    generalStatus: "",
                    specificStatus: ""
                }
                idAndEmailArray.push(idAndEmailObj);
            }
        }

        this.setState({
            userArray: idAndEmailArray,
            usersLoaded: true
        });
    }

    checkFunc = (e, cohortId: number) => {
        // this function is for the the Select ALL checkbox
        const { checked } = e.target;
        const { emailsToAssign: emAssign } = this.state;
        const id = +e.target.id;
        let emailArray: string[] = [];

        if (checked) {
            // filter out users for only ones in THIS cohort
            this.state.userArray.filter(user => {
                return user.id === cohortId;
            }).map(user => {
                // for each user in this cohort, dump them into array to assign to
                // but first, check they are not already in the array
                if (!this.state.emailsToAssign.includes(user.email)) {
                    emailArray.push(user.email);
                }
                // then check all individual user checkboxes in this cohort 
                let el = document.getElementById(user.email) as HTMLInputElement;
                if (el) { el.checked = true; }
            });
            this.setState({
                emailsToAssign: this.state.emailsToAssign.concat(emailArray)
            });

        } else {
            // if checking OFF the Select ALL, do this
            // filter through all users for     those in this checkboxes cohort
            this.state.userArray.filter(user => {
                return user.id === id
            }).map(user => {
                // push into local array to know which users to remove from state below
                emailArray.push(user.email);
                // uncheck each individual user checkbox if all is unchecked
                let el = document.getElementById(user.email) as HTMLInputElement;
                if (el) { el.checked = false; }
            });

            this.setState({
                // filter emailsToAssign:emAssign array to get rid of all emails from local emailArray
                emailsToAssign: emAssign.filter(em => {
                    let inArr: boolean = true;
                    for (const email of emailArray) {
                        if (em === email) {
                            inArr = false;
                        }
                    }
                    return inArr;
                })
            })

        }
    }
     // load general status users of selected status
    loadGeneralUser = (e, gStatus: string) => {
        const generalUsers: IUserCohortIdAndEmail[] = [];
        for(const user of this.state.allUsers) {
            if(user.userStatus.generalStatus.toLowerCase() === gStatus.toLowerCase()) {
                const generalStatusUser: IUserCohortIdAndEmail = {
                    id: user.userId,
                    email: user.email,
                    generalStatus: user.userStatus.generalStatus,
                    specificStatus: user.userStatus.specificStatus 
                }
                generalUsers.push(generalStatusUser);
            }
        }
        if(e.target.checked) {
            this.setState({
                allGeneralStatusUsers: this.state.allGeneralStatusUsers.concat(generalUsers)
            });
        } else {
            this.setState({
                allGeneralStatusUsers: this.state.allGeneralStatusUsers.filter((user) => {
                    return user.generalStatus.toLowerCase() !== gStatus.toLowerCase();
                })
            });
        }
    }
    // load specific status users of selected status
    loadSpecificUser = (e, sStatus: string) => {
        const specificUsers: IUserCohortIdAndEmail[] = [];
        for(const user of this.state.allUsers) {
            if(user.userStatus.specificStatus.toLowerCase() === sStatus.toLowerCase()) {
                const specificStatusUser: IUserCohortIdAndEmail = {
                        id: user.userId,
                        email: user.email,
                        generalStatus: user.userStatus.generalStatus,
                        specificStatus: user.userStatus.specificStatus 
                    }
                    specificUsers.push(specificStatusUser);
            }
        }
        if(e.target.checked) {
            this.setState({
                allSpecificStatusUsers: this.state.allSpecificStatusUsers.concat(specificUsers)
            });
        } else {
            this.setState({
                allSpecificStatusUsers: this.state.allSpecificStatusUsers.filter((user) => {
                    return user.specificStatus.toLowerCase() !== sStatus.toLowerCase();
                })
            });
        }
    }
    // add general status users avoid duplicates
    checkGeneralFunc = (e, status: string) => {
        this.loadGeneralUser(e, status);
        this.state.allGeneralStatusUsers.map(user => {
            this.setState({
                emailsToAssign: this.state.emailsToAssign.filter(email => {
                    return user.email !== email;
                })
            });
        });
    }
    // add specific status users avoid duplicates
    checkSpecificFunc = (e, status: string) => {
        this.loadSpecificUser(e, status);
        this.state.allSpecificStatusUsers.map(user => {
            this.setState({
                emailsToAssign: this.state.emailsToAssign.filter(email => {
                    return user.email !== email;
                })
            });
        });
    }

    checkUserFunc = (e) => {
        // this function is for each individual user email checkbox 
        const { id: email, checked } = e.target;

        if (checked) {
            // first check they are not already in the emailsToAssign array,
            //    if not, add them to it in state
            if (!this.state.emailsToAssign.includes(email)) {
                this.setState({
                    emailsToAssign: [...this.state.emailsToAssign, email]
                });
            }
        } else {
            // first check they are already in the emailsToAssign array,
            //   if yes, then remove them from it by filtering them out
            if (this.state.emailsToAssign.includes(email)) {
                this.setState({
                    emailsToAssign: this.state.emailsToAssign.filter(emailToAssign => {
                        return emailToAssign !== email;
                    })
                });

                // If they have been checked off, then Select ALL for their cohort should now be off
                //  -this achieves that by looping through the array and finding their associated
                //      cohort by id and then checking false on its associated input element
                let cohortId = '';
                for (const user of this.state.userArray) {
                    if (user.email === email) {
                        cohortId = user.id.toString();
                    }
                }
                let el = document.getElementById(cohortId) as HTMLInputElement;
                console.log()
                if (el) { el.checked = false; }
            }
        }
    }

    postSurveyToCohort = () => {
        // loop through each chosen survey from parent component and for each email,
        //   assign the survey to the history table
        for (const surveyId of this.props.surveysToAssign) {
            for (const email of this.state.emailsToAssign) {
                surveyClient.assignSurveyByIdAndEmail(surveyId, email);
            }
        }
    }

    // toggles the modal and clears the emailsToAssign
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
            emailsToAssign: []
        }));
    }
    // increment decrement pages
    incrementPage = async () => {
        if (this.state.currentPage < this.state.totalPages - 1) {
            const newPage = this.state.currentPage + 1;
            const data = await this.getAllCohorts(newPage);
            this.setState({
                currentPage: newPage
            });
        }
    }

    decrementPage = async () => {
        if (this.state.currentPage > 0) {
            const newPage = this.state.currentPage - 1;
            const data = await this.getAllCohorts(newPage);
            this.setState({
                currentPage: newPage
            });
        }
    }
    render() {
        console.log(this.state.sortCohorts);
        const { allGeneralStatus, allSpecificStatus } = this.state;

        return (
            <>
                <div>
                    <Button className='assignSurveyBtn mb-3' color="black" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader className='assignSurveyModalHeader' toggle={this.toggle}>Cohorts</ModalHeader>
                        {/* ensure users in cohorts do not show until they are loaded to avoid assign survey bug */}
                        {this.state.usersLoaded ? (
                            <ModalBody>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <Label className="input-group-text">General Status: </Label>
                                    </div>
                                    <div className="input-group-text">
                                    { allGeneralStatus && Array.from(allGeneralStatus).map(status => (
                                            // <Label className="form-check-label">{status}</Label>
                                            <div key={'general' + status} className="form-check form-check-inline input-group-text">
                                                <Input className="form-check-input" type="checkbox" id={status} value={status} onChange={(e)=> this.checkGeneralFunc(e, status)}></Input>
                                                <Label className="form-check-label" for={status}>{status}</Label>
                                            </div>

                                        ))
                                    }
                                    </div>
                                </div>
                                <div className="input-group mb-3 input-group-text">
                                    <div className="input-group-prepend">
                                        <Label className="input-group-text">Specific Status:  </Label>
                                    </div>
                                    {/* <div className="input-group-text"> */}
                                    { allSpecificStatus && Array.from(allSpecificStatus).map(status => (
                                                <div key={'specific' + status} className="form-check form-check-inline input-group-text">
                                                <Input className="form-check-input" type="checkbox" id={'specific'+status} value={status} onChange={(e) => this.checkSpecificFunc(e, status)}></Input>
                                                <Label className="form-check-label" for={'specific'+status}>{status}</Label>
                                                </div>
                                        ))
                                    }
                                    {/* </div> */}
                                    </div>
                                <Table striped id="manage-users-table" className="tableUsers">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th colSpan={5}>Cohort</th>
                                            <th><input type="text" id="box" name="Name" placeholder="Name" value={this.state.nameTextBox} onChange={(e) => this.searchByName(e)}></input></th>
                                            <th><input type="text" id="box" name="AddressName" placeholder="Address" value={this.state.alias} onChange={(e) => this.searchByAddressName(e)}></input></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sortCohorts && this.state.sortCohorts.map(cohort => (
                                            <tr key={`modal${cohort.cohortId}`} className="rev-table-row">
                                                <td>All: <input type="checkbox" onChange={e => this.checkFunc(e, cohort.cohortId)} />
                                                </td>
                                                <td colSpan={5}>{cohort.cohortName}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {(this.state.totalPages > 0) &&
                                    (<div className='row horizontal-centering vertical-centering'>
                                        <Button variant="button-color" className="rev-background-color div-child" onClick={() => this.decrementPage()}>Prev</Button>
                                        <h6 className="div-child text-style" >
                                            Page {this.state.currentPage + 1} of {this.state.totalPages}
                                        </h6>
                                        <Button variant="button-color" className="rev-background-color div-child" onClick={() => this.incrementPage()}>Next</Button>
                                    </div>)
                                }
                                <div className="buttonDiv">
                                    <Button
                                        className='assignSurveyBtn'
                                        onClick={() => { this.postSurveyToCohort(); this.toggle(); }
                                        }>Submit</Button>
                                </div>
                            </ModalBody>) : (
                                <Loader />
                            )}
                    </Modal>
                </div>

            </>
        );
    }
}

export default SurveyModal;
