import React from 'react';
import { Table } from 'reactstrap';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { ISurvey } from '../../../model/surveys/survey.model';
import { Redirect } from 'react-router';

interface SurveyAvailableProps {

}

interface SurveyAvailableState {
    surveys: ISurvey[],
    surveysLoaded: boolean,
    redirectTo: any
}


export class SurveyAvailableComponent extends React.Component<SurveyAvailableProps, SurveyAvailableState> {
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
        this.setState({
            surveys: surveys,
            surveysLoaded: true
        })
    }

    handleTakeSurvey = (surveyId: number) => {
        this.setState({
            redirectTo: `/surveys/survey-taking/${surveyId}`
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <>
                {this.state.surveysLoaded ? (

                    <Table striped id="manage-users-table" className="tableUsers">
                        <thead className="rev-background-color">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date Created</th>
                                <th>Closing Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.surveys.map(survey => (
                                <tr key={survey.surveyId} className="rev-table-row" onClick={() => this.handleTakeSurvey(survey.surveyId)}>
                                    <td>{survey.title}</td>
                                    <td>{survey.description}</td>
                                    <td>{survey.dateCreated && new Date(survey.dateCreated).toDateString()}</td>
                                    <td>{survey.closingDate && new Date(survey.closingDate).toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                        <div>Loading...</div>
                    )}
            </>
        );
    }
}

export default SurveyAvailableComponent;