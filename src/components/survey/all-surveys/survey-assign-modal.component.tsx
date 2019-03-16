import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ICohort } from '../../../model/cohort';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';
import { surveyClient } from '../../../axios/sms-clients/survey-client';


interface IComponentProps {
    surveysToAssign: number[],
    buttonLabel: string
}

interface IComponentState {
    cohorts: ICohort[],
    cohortIdsToAssign: number[],
    cohortsLoaded: boolean,
    modal: boolean
}

class SurveyModal extends React.Component<IComponentProps, IComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cohorts: [],
      cohortsLoaded: false,
      cohortIdsToAssign: []
    };
  }

    componentDidMount() {
        //    surveyClient.assignSurveyByIdAndEmail(1, );
           this.loadAllCohorts();
        // this.loadCohortUsersToAssign();
    }

    componentDidUpdate() {
        // this.loadCohortUsersToAssign();
    }


    loadAllCohorts = async () => {
        const cohorts = await cohortClient.findAll();
        await console.log('cohorts:');
        await console.log(cohorts.data);
        if (cohorts) {
            this.setState({
                cohorts: cohorts.data,
                cohortsLoaded: true
            })
        }
    }

    loadCohortUsersToAssign = async () => {
        const { cohortIdsToAssign : ids } = this.state;
        const emailArray:string[] = [];
        if (ids.length > 0) {
            for (const id of ids) {
                const users = await userClient.findAllByCohortId(id);
                for (const user of users.data) {
                    emailArray.push(user.email);
                }
            }
        }

        for ( const surveyId of this.props.surveysToAssign) {
            for ( const email of emailArray) {
               surveyClient.assignSurveyByIdAndEmail(surveyId, email);
            }
        }
    
    }

    checkFunc = (e) => {
        const { checked } = e.target;
        const id = +e.target.id;
        if (checked) {
            if (!this.state.cohortIdsToAssign.includes(id)) {
                this.setState({
                    cohortIdsToAssign: [...this.state.cohortIdsToAssign, id]
                });
            }
        }  else {
            if (this.state.cohortIdsToAssign.includes(id)) {
                this.setState({
                    cohortIdsToAssign: this.state.cohortIdsToAssign.filter((cohortId) => { 
                        return cohortId !== id 
                })});
            }
        }
    }

    postSurveyToCohort = () => {
        console.log(`survey ids: ${this.props.surveysToAssign}`);
        console.log(`cohort ids: ${this.state.cohortIdsToAssign}`);
        this.loadCohortUsersToAssign();
    }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
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
                            <td><input type="checkbox"  id={cohort.cohortId.toString()}  onChange={e=>this.checkFunc(e)} /></td>
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
                        onClick={()=>{this.postSurveyToCohort(); this.toggle()}
                        }>Submit</Button>
                </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SurveyModal;