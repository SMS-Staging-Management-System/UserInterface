import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ICohort } from '../../../model/cohort';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
// import Loader from '../Loader/Loader';
// import createCohortModalContainer from '../../manage/create-cohort-modal/create-cohort-modal.container';


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
        this.loadAllCohorts();
    }

    loadAllUserEmails = async () => {
        const { cohorts } = this.state;
        const idAndEmailArray: IUserCohortIdAndEmail[] = [];
        for (const cohort of cohorts) {
            const users = await userClient.findAllByCohortId(cohort.cohortId);
            for (const user of users.data) {
                const idAndEmailObj: IUserCohortIdAndEmail = {
                    id: cohort.cohortId,
                    email: user.email
                }
                idAndEmailArray.push(idAndEmailObj);
            }
        }

        this.setState({
            userArray: idAndEmailArray
        }, 
            () => {
                console.log(this.state.userArray);
            });
    }

    loadAllCohorts = async () => {
        const cohorts = await cohortClient.findAll();
        await console.log('cohorts:');
        await console.log(cohorts.data);
        if (cohorts) {
            this.setState({
                cohorts: cohorts.data,
                cohortsLoaded: true
            }, 
                ()=>{
                    this.loadAllUserEmails();
                });
        }
    }

    checkFunc = (e) => {
        const { checked } = e.target;
        const id = +e.target.id;
        const emailArray:string[] = [];
        const { emailsToAssign: emAssign } = this.state;
        if (checked) {

            this.state.userArray.filter(user => {
                return user.id === id
            }).map(user => {
                emailArray.push(user.email);
                
                
            });

            this.setState({
                emailsToAssign: this.state.emailsToAssign.concat(emailArray)
            })



        }  else {

            this.state.userArray.filter(user => {
                return user.id === id
            }).map(user => {
                emailArray.push(user.email);
            });

            this.setState({
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
        const { id: email, checked } = e.target;
        if (checked) {
            if (!this.state.emailsToAssign.includes(email)) {
                this.setState({
                    emailsToAssign: [...this.state.emailsToAssign, email]
                });
            }
        } else {
            if (this.state.emailsToAssign.includes(email)) {
                this.setState({
                    emailsToAssign: this.state.emailsToAssign.filter(emailToAssign => {
                        return emailToAssign !== email;
                    })
                });
            }
        }
    }

    componentDidUpdate() {
        console.log(this.state.emailsToAssign);
    }

    postSurveyToCohort = () => {
        console.log(`survey ids: ${this.props.surveysToAssign}`);
        console.log(`cohort ids: ${this.state.cohortIdsToAssign}`);
        // this.loadCohortUsersToAssign();

        for ( const surveyId of this.props.surveysToAssign) {
            for ( const email of this.state.emailsToAssign) {
            surveyClient.assignSurveyByIdAndEmail(surveyId, email);
            }
        }
    }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      emailsToAssign: []
    }));
  }

//   toggleDropdown = (i) => {

//   }

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
                            <td>All: <input type="checkbox"  id={cohort.cohortId.toString()}  onChange={e=>this.checkFunc(e)} />
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