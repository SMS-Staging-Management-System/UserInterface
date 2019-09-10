import React, { Component } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { IAnswer } from '../../../model/surveys/answer.model';
import { IResponse } from '../../../model/surveys/response.model';
import Loader from '../Loader/Loader';
import { IHistory } from '../../../model/surveys/history.model';

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState,
    match: any
};

interface IComponentState {
    survey: any,
    surveyLoaded: boolean,
    responses: any,
    newFeedback: any,
    anonymousResponses: boolean,
    redirectTo: any
};

class SurveyTakingComponent extends Component<IComponentProps, IComponentState>{
    constructor(props) {
        super(props);
        this.state = {
            survey: {
                surveyId: 0,
                title: '',
                description: '',
                dateCreated: new Date(),
                closingDate: new Date(),
                template: false,
                published: false
            },
            surveyLoaded: false,
            responses: [],
            newFeedback: [],
            anonymousResponses: false,
            redirectTo: null
        };
    };

    componentDidMount() {
        this.loadSurvey();
    };

    loadSurvey = async () => {
        const survey = await surveyClient.findSurveyById(this.props.match.params.surveyId);
        this.setState({
            survey: survey,
            surveyLoaded: true
        });
    };

    // Updates state when the user selects an option
    handleResponseInput = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            responses: {
                ...prevState.responses,
                [name]: value
            }
        }));
    };

    // Updates state when the user enters feedback
    handleFeedbackInput = event => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newFeedback: {
                ...prevState.newFeedback,
                [name]: value
            }
        }));
    };

    // Updates state when the user selects to have anonymous responses
    handleAnonymousCheckbox = event => {
        const { name, checked } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: checked

        }));
    };

    // Submits responses to the database
    handleSubmitResponses = async (event) => {
        event.preventDefault();
        // Get all of the histories for the current user
        const currentUserHistories = await surveyClient.findHistoriesByEmail(this.props.auth.currentUser.email);
        let historiesForThisSurvey: IHistory[] = [];
        // For each of the histories, check if they match the current survey and if they are not yet completed. If so, save them in an array
        currentUserHistories.forEach(history => {
            if ((history.surveyId === this.state.survey.surveyId) && (history.dateCompleted === null)) {
                historiesForThisSurvey.push(history);
            }
        });
        // If this user isn't assigned the survey, don't submit the responses, and redirect to /surveys
        if (historiesForThisSurvey.length === 0) {
            this.setState({
                redirectTo: '/surveys'
            })
        }
        // If the user is assigned the survey, update the history to mark it as complete, and submit the responses
        else {
            // Update the history item as complete
            surveyClient.updateHistoryAsComplete(historiesForThisSurvey[0].historyId);
            let email;
            // If the user checked the anonymous box, don't submit their email with the responses
            if (this.state.anonymousResponses) {
                email = '';
            } else {
                // Otherwise, grab their email from the auth
                email = this.props.auth.currentUser.email;
            }
            // Submit the Responses
            for(let key in this.state.responses) {
                const responseToSubmit: IResponse = {
                    answerId: {
                        answer: '',
                        answerId: this.state.responses[key],
                        question: { questionId: 0, question: '', typeId: 0, answers: [] }
                    },
                    id: 0,
                    surveyId: {
                        closingDate: new Date(),
                        creator: '',
                        dateCreated: new Date(),
                        description: '',
<<<<<<< HEAD
                        questionJunctions: [],
                        surveyId: this.state.survey.surveyId,
=======
                        creator: '',
>>>>>>> carri-thas-edward
                        template: true,
                        title: '',
                    },
                    userEmailString: email
                }
                surveyClient.saveResponse(responseToSubmit);
            }
            // Submit the feedback
            for(let key in this.state.newFeedback) {
                const newAnswer: IAnswer = {
                    answer: this.state.newFeedback[key],
                    answerId: 0,
                    question: {
                        answers: [],
                        question: '',
                        questionId: parseInt(key, 10),
                        typeId: 0
                    }
                }
                surveyClient.saveAnswer(newAnswer);
            }
            // Redirect to the main page
            this.setState({
                redirectTo: '/surveys'
            })
        }
    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <div className="container">
                <div className="jumbotron">
                    {this.state.surveyLoaded ? (
                        <>
                            <h2 className="mb-3">{this.state.survey.title}</h2>
                            {this.state.surveyLoaded &&
                                <form>
                                    {
                                        this.state.survey.questionJunctions.map(questionJunction => (
                                            <div key={questionJunction.question.questionId} className="card form-group mb-3">
                                                <h5 className="card-header">{questionJunction.question.question}</h5>
                                                <div className="card-body">
                                                    {questionJunction.question.typeId === 5 ? (
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name={questionJunction.question.questionId}
                                                                value={this.state.newFeedback[questionJunction.question.questionId] || ''}
                                                                onChange={this.handleFeedbackInput}
                                                                placeholder="Enter your response here"
                                                            />
                                                        </div>
                                                    ) : (
                                                            <>
                                                                {questionJunction.question.answers &&

                                                                    questionJunction.question.answers.map(choice => (
                                                                        <div key={choice.answerId} className="form-check">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name={`question-${questionJunction.question.questionId}-choice`}
                                                                                value={choice.answerId}
                                                                                onChange={this.handleResponseInput}
                                                                            />
                                                                            <label className="form-check-label">
                                                                                {choice.answer} </label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="form-check">
                                        <input
                                            className="form-check-input position-static"
                                            type="checkbox"
                                            checked={this.state.anonymousResponses}
                                            name="anonymousResponses"
                                            onChange={this.handleAnonymousCheckbox} />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Make my responses anonymous
                                        </label>
                                    </div>
                                    <button type="submit" className="submitSurveyButton" onClick={this.handleSubmitResponses}>Submit</button>
                                </form>
                            }
                        </>
                    ) : (
                            <Loader />
                        )}
                </div>
            </div >
        )
    };
};

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(SurveyTakingComponent);