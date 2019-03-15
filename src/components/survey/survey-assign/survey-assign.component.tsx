// NO LONGER IN USE

import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
// import SurveyModal from './survey-assign-modal.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';

export class SurveyAssignComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false,
            surveysToAssign: []
        }
    }


    componentDidMount() {
        this.loadAllSurveys();
    }

    loadAllSurveys = async () => {
        const surveys = await surveyClient.findAllSurveys();
        if (surveys) {
            this.setState({
                surveys: surveys,
                surveysLoaded: true
            });
        }
    }

    checkFunc = (e) => {
        const { checked } = e.target;
        const id = +e.target.id;

        if (checked) {
            if (!this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: [...this.state.surveysToAssign, id]
                });
            }
        }  else {
            if (this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: this.state.surveysToAssign.filter((surveyId) => { 
                        return surveyId !== id 
                })});
            }
        }
    }

    loadMySurveys = () => {
        const dummySurveyData = [{
            id: 1,
            title: 'Example Survey 1',
            description: 'Example Survey 1 Description'
        },
        {
            id: 2,
            title: 'Example Survey 2',
            description: 'Example Survey 2 Description'
        },
        {
            id: 3,
            title: 'Example Survey 3',
            description: 'Example Survey 3 Description'
        },
        {
            id: 4,
            title: 'Example Survey 4',
            description: 'Example Survey 4 Description'
        }]
        this.setState({
            surveys: dummySurveyData,
            surveysLoaded: true
        })
    }



    render() {
        // console.log(this.state.surveysToAssign);
        return (
            <Fragment>
                    <Table striped id="manage-users-table" className="tableUsers">
                        <thead className="rev-background-color">
                        <tr>
                            <th>Select</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.surveys.map(survey => (
                                    <tr key={survey.surveyId} className="rev-table-row">
                                        <td><input type="checkbox" onChange={e=>this.checkFunc(e)} id={survey.surveyId}/></td>
                                        <td>{survey.title}</td>
                                        <td>{survey.description}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>

                <div className="buttonDiv">
                        {/* <SurveyModal 
                            buttonLabel='Assign To Cohorts' 
                            surveysToAssign={this.state.surveysToAssign}/> */}
                </div>
            </Fragment>
        );
    }
}


export default SurveyAssignComponent;