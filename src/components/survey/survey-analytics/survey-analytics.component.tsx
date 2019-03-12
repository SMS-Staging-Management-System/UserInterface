import React from 'react';
import { Table } from 'reactstrap';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';

export class SurveyAnalyticsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false,
            redirectTo: null
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

    handleLoadSurveyData = (surveyId: number) => {
        this.setState({
            redirectTo: `/surveys/survey-data/${surveyId}`
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <Table striped id="manage-users-table" className="tableUsers">
                <thead className="rev-background-color">
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.surveys.map(survey => (
                            <tr key={survey.surveyId} className="rev-table-row" onClick={() => this.handleLoadSurveyData(survey.surveyId)}>
                                <td>{survey.title}</td>
                                <td>{survey.description}</td>
                            </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}


export default SurveyAnalyticsComponent;