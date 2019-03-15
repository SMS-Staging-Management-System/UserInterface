import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { cohortClient } from '../../../axios/sms-clients/cohort-client';

class SurveyModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cohorts: [1,2,3],
      cohortsToAssign: []
    };
    
  }

    componentDidMount() {
        this.loadMyCohorts();
    }

    // loadAllCohorts = async () => {
    //     // const surveys = await cohortClient.findAllCohorts();
    //     if (cohorts) {
    //         this.setState({
    //             cohorts: cohorts,
    //             cohortsLoaded: true
    //         })
    //     }
    // }

    loadMyCohorts = () => {
        const dummyCohortData = [{
            id: 1,
            title: 'Cohort 1'
        }, {
            id: 2,
            title: 'Cohort 2'
        }, {
            id: 3,
            title: 'Cohort 3'
        }]
        this.setState({
            cohorts: dummyCohortData,
            cohortsLoaded: true
        })
    }

    checkFunc = (e) => {
        const { checked } = e.target;
        const id = +e.target.id;
        if (checked) {
            if (!this.state.cohortsToAssign.includes(id)) {
                this.setState({
                    cohortsToAssign: [...this.state.cohortsToAssign, id]
                });
            }
        }  else {
            if (this.state.cohortsToAssign.includes(id)) {
                this.setState({
                    cohortsToAssign: this.state.cohortsToAssign.filter((cohortId) => { 
                        return cohortId !== id 
                })});
            }
        }
    }

    postSurveyToCohort = () => {
        console.log(`survey ids: ${this.props.surveysToAssign}`);
        console.log(`cohort ids: ${this.state.cohortsToAssign}`);
    }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button className='assignSurveyBtn' color="black" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className='assignSurveyModalHeader' toggle={this.toggle}>Cohorts</ModalHeader>
          <ModalBody>
              <Table striped id="manage-users-table" className="tableUsers">
                  <thead>
                      <tr>
                        <th>Select</th>
                        <th colSpan={5}>Cohort Title</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.state.cohorts.map(cohort => (
                        <tr key={`modal${cohort.id}`} className="rev-table-row">
                            <td><input type="checkbox"  id={cohort.id}  onChange={e=>this.checkFunc(e)} /></td>
                            <td colSpan={5}>{cohort.title}</td>
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