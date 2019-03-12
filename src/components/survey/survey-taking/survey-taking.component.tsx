import React, { Component } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { IAnswer } from '../../../model/surveys/answer.model';
import { IResponse } from '../../../model/surveys/response.model';

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState,
    match: any
};

interface IComponentState {
    survey: any,
    surveyLoaded: boolean,
    responses: any,
    newFeedback: any,
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
        // const updatedResponses = this.state.responses.concat({ [name]: value });
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
        // const updatedResponses = this.state.responses.concat({ [name]: value });
        this.setState(prevState => ({
            newFeedback: {
                ...prevState.newFeedback,
                [name]: value

            }
        }));
    };

    // Submits responses to the database
    handleSubmitResponses = (event) => {
        event.preventDefault();
        for (let key in this.state.responses) {
            console.log('key', key);
            const responseToSubmit: IResponse = {
                "answerId": {
                    "id": this.state.responses[key],
                    "answer": '',
                    "questionId": 0
                },
                "id": 0,
                "surveyId": {
                    "surveyId": this.state.survey.surveyId,
                    "closingDate": new Date(),
                    "dateCreated": new Date(),
                    "description": '',
                    "published": true,
                    "template": true,
                    "title": ''
                },
                "userEmailString": this.props.auth.currentUser.email
            }
            surveyClient.saveResponse(responseToSubmit);
        }
        for (let key in this.state.newFeedback) {
            const newAnswer: IAnswer = {
                "id": 0,
                "answer": this.state.newFeedback[key],
                "questionId": parseInt(key)
            }
            surveyClient.saveAnswer(newAnswer);
        }
        this.setState({
            redirectTo: '/surveys'
        })
    };

    render() {
        console.log('survey-taking this.state', this.state)
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
                                            <div key={questionJunction.questionId.questionId} className="card form-group mb-3">
                                                <h5 className="card-header">{questionJunction.questionId.question}</h5>
                                                <div className="card-body">
                                                    {questionJunction.questionId.typeId === 5 ? (
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name={questionJunction.questionId.questionId}
                                                                value={this.state.newFeedback[questionJunction.questionId.questionId] || ''}
                                                                onChange={this.handleFeedbackInput}
                                                                placeholder="Enter your response here"
                                                            />
                                                        </div>
                                                    ) : (
                                                            <>
                                                                {questionJunction.questionId.answerChoices &&

                                                                    questionJunction.questionId.answerChoices.map(choice => (
                                                                        <div key={choice.id} className="form-check">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name={`question-${questionJunction.questionId.questionId}-choice`}
                                                                                value={choice.id}
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
                                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmitResponses}>Submit</button>
                                </form>
                            }
                        </>
                    ) : (
                            <div>Loading...</div>
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