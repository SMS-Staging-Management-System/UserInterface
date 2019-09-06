import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ICohort } from '../../../model/cohort';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import Loader from '../Loader/Loader';


interface IComponentProps {
    surveysToAssign: number[],
    buttonLabel: string
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
    alias: string
}

interface IUserCohortIdAndEmail {
    id: number,
    email: string,

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
            alias: ''
        };
    }

    componentDidMount() {
        // grabs all cohorts from database and loads them into
        //   the userArray, each having their cohort id and email address
        this.loadAllCohorts();
    }

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
            for (const user of users.data) {
                // make object for each user to push to array
                const idAndEmailObj: IUserCohortIdAndEmail = {
                    id: cohort.cohortId,
                    email: user.email
                }
                idAndEmailArray.push(idAndEmailObj);
            }
        }

        this.setState({
            userArray: idAndEmailArray,
            usersLoaded: true
        });
    }

    checkFunc = (e , cohortId) => {
        // this function is for the the Select ALL checkbox
        const { checked } = e.target;
        const { emailsToAssign } = this.state;
        const id = +e;
        let emailArray: string[] = [];

        
        this.state.userArray.filter(user => {
            return user.id === cohortId
        }).map(user => {
            emailArray.push(user.email);
        })

        if(checked){
            this.setState({
                emailsToAssign: emailArray
            })
        } else {
            this.setState({
                emailsToAssign: []
            })
        }

        
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

    render() {
        console.log(this.state.sortCohorts);

        return (
            <>
                <div>
                    <Button className='assignSurveyBtn mb-3' color="black" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader className='assignSurveyModalHeader' toggle={this.toggle}>Cohorts</ModalHeader>
                        {/* ensure users in cohorts do not show until they are loaded to avoid assign survey bug */}
                        {this.state.usersLoaded ? (
                            <ModalBody>
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
                                                <td>All: <input className="userDropInput" type="checkbox" onChange={e => this.checkFunc(e, cohort.cohortId)} />
                                                    <div className="dropdown userDropdown">
                                                        <Button className="btn userDropdownBtn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            By Member
                                                        </Button>
                                                        <div className="dropdown-menu" id="userDropdownWidth" aria-labelledby="dropdownMenu2">
                                                            {this.state.userArray.filter(user => {
                                                                return user.id === cohort.cohortId;
                                                            }).map(user => (
                                                                <p key={`email${user.email}`}><input className="userDropInput" id={user.email} type="checkbox" checked={this.state.emailsToAssign.includes(user.email)} onChange={e => this.checkUserFunc(e)} />{user.email} </p>
                                                            )
                                                            )}
                                                        </div>
                                                    </div>
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
