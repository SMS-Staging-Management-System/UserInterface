import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Table } from 'reactstrap';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { ISurvey } from '../../../model/surveys/survey.model';
import { connect } from 'react-redux';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState;
}

interface IComponentState {
    surveys: ISurvey[],
    surveysLoaded: boolean,
    redirectTo: any
}

class AssignedSurveysComponent extends Component<IComponentProps, IComponentState, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false,
            redirectTo: null
        }
    }

    componentDidMount() {
        this.loadMyAssignedSurveys();
    }

    loadMyAssignedSurveys = async () => {
        // const myAssignedSurveys = await surveyClient.findSurveysAssignedToUser(this.props.auth.currentUser.email);
        const myAssignedSurveys = await surveyClient.findAllSurveys();
        this.setState({
            surveys: myAssignedSurveys,
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
                    this.state.surveys ? (
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
                            <div>No Surveys to Display</div>
                        )
                ) : (
                        <div>Loading...</div>
                    )}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(AssignedSurveysComponent);