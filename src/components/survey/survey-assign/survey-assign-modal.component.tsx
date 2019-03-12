import React from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { cohortClient } from '../../../axios/sms-clients/cohort-client';

class SurveyModal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      cohorts: [1,2,3],
      surveysPosting: []
    };
    
  }

    componentDidMount() {
        this.loadMyCohorts();
        this.setState({
            surveysPosting: this.props.surveysToAssign
        });
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

    postSurveyToCohort = (e) => {
        console.log(`should be posting survey to cohort ${e.target.id}!`);
        console.log(this.props.surveysToAssign);
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
          <ModalHeader className='assignSurveyModalHeader' toggle={this.toggle}>Surveys</ModalHeader>
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
                    {this.state.cohorts.map(cohort => (
                        <tr className="rev-table-row">
                            <td><input type="checkbox" /></td>
                            <td colSpan={5} id={cohort.id} onClick={e=>this.postSurveyToCohort(e)}>{cohort.title}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        
                    ))}
                </Table>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SurveyModal;