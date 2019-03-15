import React, { Fragment, Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Table, Button } from 'reactstrap';
import { ISurvey } from '../../../model/surveys/survey.model';
import SurveyModal from './survey-assign-modal.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState;
}

interface IComponentState {
    surveys: ISurvey[],
    surveysLoaded: boolean,
    surveysToAssign: number[],
    redirectTo: string | null
}

class MySurveysComponent extends Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false,
            surveysToAssign: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        this.loadMySurveys();
    }

    // When the user clicks a data button for a survey, redirect to the data page for that survey
    handleLoadSurveyData = (surveyId: number) => {
        this.setState({
            redirectTo: `/surveys/survey-data/${surveyId}`
        })
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
        } else {
            if (this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: this.state.surveysToAssign.filter((surveyId) => {
                        return surveyId !== id
                    })
                });
            }
        }
    }


    // Load the surveys into the state
    loadMySurveys = async () => {
        // const mySurveys = await surveyClient.findSurveysAssignedToUser(this.props.auth.currentUser.email);
        const mySurveys = await surveyClient.findAllSurveys();
        this.setState({
            surveys: mySurveys,
            surveysLoaded: true
        })
    }

    render() {
        console.log('this.state.surveys', this.state.surveys);
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <>
                {this.state.surveysLoaded ? (
                    <Fragment>
                        {this.state.surveys ? (
                            <>
                                <Table striped id="manage-users-table" className="tableUsers">
                                    <thead className="rev-background-color">
                                        <tr>
                                            <th>Select</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Date Created</th>
                                            <th>Closing Date</th>
                                            <th>Template</th>
                                            <th>Published</th>
                                            <th>Analytics</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.surveys.map(survey => (
                                            <tr key={survey.surveyId} className="rev-table-row">
                                                <td><input type="checkbox" onChange={e => this.checkFunc(e)} id={survey.surveyId.toString()} /></td>
                                                <td>{survey.title}</td>
                                                <td>{survey.description}</td>
                                                <td>{survey.dateCreated && new Date(survey.dateCreated).toDateString()}</td>
                                                <td>{survey.closingDate && new Date(survey.closingDate).toDateString()}</td>
                                                <td>{survey.template ? 'Yes' : 'No'}</td>
                                                <td>{survey.published ? 'Yes' : 'No'}</td>
                                                <td><Button className='assignSurveyBtn' onClick={() =>
                                                    this.handleLoadSurveyData(survey.surveyId)}>Data</Button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="assignButtonDiv">
                                    <SurveyModal
                                        buttonLabel='Assign To Cohorts'
                                        surveysToAssign={this.state.surveysToAssign} />
                                </div>
                            </>
                        ) : (
                                <div>No Surveys to Display</div>
                            )}
                    </Fragment>
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

export default connect(mapStateToProps)(MySurveysComponent);