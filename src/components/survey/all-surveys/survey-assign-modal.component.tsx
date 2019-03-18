import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ICohort } from '../../../model/cohort';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
// import Loader from '../Loader/Loader';


interface IComponentProps {
    surveysToAssign: number[],
    buttonLabel: string
}

interface IComponentState {
    cohorts: ICohort[],
    cohortIdsToAssign: number[],
    cohortsLoaded: boolean,
    userArray: IUserCohortIdAndEmail[],
    emailsToAssign: string[],
    modal: boolean
}

interface IUserCohortIdAndEmail {
    id: number,
    email: string
}

class SurveyModal extends React.Component<IComponentProps, IComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cohorts: [],
      cohortsLoaded: false,
      userArray: [],
      cohortIdsToAssign: [],
      emailsToAssign: []
    };
  }

    componentDidMount() {
        // grabs all cohorts from database and loads them into
        //   the userArray, each having their cohort id and email address
        this.loadAllCohorts();
    }



    loadAllCohorts = async () => {
        // get all cohorts
        const cohorts = await cohortClient.findAll();
        if (cohorts) {
            this.setState({
                cohorts: cohorts.data,
                cohortsLoaded: true
            }, 
            // then, only AFTER state is changed, load user emails according from cohort data
                ()=>{
                    this.loadAllUserEmails();
                });
        }
    }

    loadAllUserEmails = async () => {
        const { cohorts } = this.state;
        // set up array to dump into state 
        const idAndEmailArray: IUserCohortIdAndEmail[] = [];

        // for each cohort, get users
        for (const cohort of cohorts) {
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
            userArray: idAndEmailArray
        });
    }

    checkFunc = (e) => {
        // this function is for the the Select ALL checkbox
        const { checked } = e.target;
        const { emailsToAssign: emAssign } = this.state;
        const id = +e.target.id;
        let emailArray:string[] = [];

        if (checked) {
            // filter out users for only ones in THIS cohort
            this.state.userArray.filter(user => {
                return user.id === id
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

        }  else {
            // if checking OFF the Select ALL, do this
            // filter through all users for those in this checkboxes cohort
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
                    let inArr:boolean = true;
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
                if (el) { el.checked = false; }
            }
        }
    }

    postSurveyToCohort = () => {
        // loop through each chosen survey from parent component and for each email,
        //   assign the survey to the history table
        for ( const surveyId of this.props.surveysToAssign) {
            for ( const email of this.state.emailsToAssign) {
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
    return (
      <div>
        <Button className='assignSurveyBtn mb-3' color="black" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='assignSurveyModalHeader' toggle={this.toggle}>Cohorts</ModalHeader>
          <ModalBody>
              <Table striped id="manage-users-table" className="tableUsers">
                  <thead>
                      <tr>
                        <th>Select</th>
                        <th colSpan={5}>Cohort</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.cohorts.map(cohort => (
                        <tr key={`modal${cohort.cohortId}`} className="rev-table-row">
                            <td>All: <input type="checkbox" id={cohort.cohortId.toString()}  onChange={e=>this.checkFunc(e)} />
                                <div className="dropdown userDropdown">
                                    <Button className="btn userDropdownBtn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        By Member
                                    </Button>
                                    <div className="dropdown-menu" id="userDropdownWidth" aria-labelledby="dropdownMenu2">
                                        {this.state.userArray.filter(user => {
                                            return user.id === cohort.cohortId;
                                        }).map(user => (
                                            <p key={`email${user.email}`}><input className="userDropInput" id={user.email} type="checkbox" onChange={e=>this.checkUserFunc(e)}/>{user.email}</p>
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
                        onClick={()=>{this.postSurveyToCohort(); this.toggle(); }
                        }>Submit</Button>
                </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SurveyModal;