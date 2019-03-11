import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { ISurvey } from '../../../model/surveys/survey.model'

interface MySurveysProps {

}

interface MySurveysState {
    surveys: ISurvey[],
    surveysLoaded: boolean
}

class MySurveysComponent extends Component<MySurveysProps, MySurveysState> {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false
        }
    }

    componentDidMount() {
        this.loadMySurveys();
    }

    // Load the surveys into the state
    loadMySurveys = () => {
        const dummySurveyData = [{
            surveyId: 1,
            title: 'Example Survey 1',
            description: 'Example Survey 1 Description',
            dateCreated: new Date('03-09-2019'),
            closingDate: new Date('03-25-2019'),
            template: false,
            published: true
        },
        {
            surveyId: 2,
            title: 'Example Survey 2',
            description: 'Example Survey 2 Description',
            dateCreated: new Date('02-15-2019'),
            closingDate: new Date('03-15-2019'),
            template: true,
            published: true
        },
        {
            surveyId: 3,
            title: 'Example Survey 3',
            description: 'Example Survey 3 Description',
            dateCreated: new Date('03-05-2019'),
            closingDate: new Date('03-22-2019'),
            template: false,
            published: false
        },
        {
            surveyId: 4,
            title: 'Example Survey 4',
            description: 'Example Survey 4 Description',
            dateCreated: new Date('03-10-2019'),
            closingDate: new Date('03-20-2019'),
            template: false,
            published: true
        }]
        this.setState({
            surveys: dummySurveyData,
            surveysLoaded: true
        })
    }

    render() {
        console.log('this.state.surveys', this.state.surveys);
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
                                <th>Template</th>
                                <th>Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.surveys.map(survey => (
                                <tr key={survey.surveyId} className="rev-table-row">
                                    <td>{survey.title}</td>
                                    <td>{survey.description}</td>
                                    <td>{survey.dateCreated.toDateString()}</td>
                                    <td>{survey.closingDate.toDateString()}</td>
                                    <td>{survey.template ? 'Yes' : 'No'}</td>
                                    <td>{survey.published ? 'Yes' : 'No'}</td>
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

export default MySurveysComponent;