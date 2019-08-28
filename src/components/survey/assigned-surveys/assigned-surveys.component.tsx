import React, { Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Table } from 'reactstrap';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { ISurvey } from '../../../model/surveys/survey.model';
import { connect } from 'react-redux';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import Loader from '../Loader/Loader';

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

    componentDidUpdate(prevProps) {
        if (prevProps.auth !== this.props.auth) {
            this.loadMyAssignedSurveys();
        }
    }

    loadMyAssignedSurveys = async () => {
<<<<<<< HEAD

=======
        
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        if (this.props.auth.currentUser.email) {
            const myAssignedSurveys = await surveyClient.findSurveysAssignedToUser(this.props.auth.currentUser.email);
            this.setState({
                surveys: myAssignedSurveys,
                surveysLoaded: true
            })
        }
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
<<<<<<< HEAD
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
                            {this.state.surveys.length ?
                                (this.state.surveys.map((survey, index) => (
=======
                    this.state.surveys.length ? (
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
                                {this.state.surveys.map((survey, index) => (
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
                                    <tr key={index} className="rev-table-row" onClick={() => this.handleTakeSurvey(survey.surveyId)}>
                                        <td>{survey.title}</td>
                                        <td>{survey.description}</td>
                                        <td>{survey.dateCreated && new Date(survey.dateCreated).toDateString()}</td>
                                        <td>{survey.closingDate && new Date(survey.closingDate).toDateString()}</td>
                                    </tr>
<<<<<<< HEAD
                                ))
                                ) :
                                (
                                    <tr className="rev-table-row">
                                        <td colSpan={4} ><div className='div-center fadeInUp'>You have no surveys assigned.</div></td>
                                    </tr>
                                    )}
                        </tbody>
                    </Table>
                ) : (
                        <Loader />
=======
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                            <div>No Surveys to Display</div>
                        )
                ) : (
                        <Loader/>
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
                    )}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(AssignedSurveysComponent);