import React, { Component } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';
import { IAnswer } from '../../../model/surveys/answer.model';
import { IResponse } from '../../../model/surveys/response.model';

interface SurveyTakingProps {
    match: any
}

interface SurveyTakingState {
    survey: any,
    surveyLoaded: boolean,
    responses: any,
    newFeedback: any,
    redirectTo: any
}

export default class SurveyTakingComponent extends Component<SurveyTakingProps, SurveyTakingState>{
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
        }
    }

    async componentDidMount() {
        const survey = await surveyClient.findSurveyById(this.props.match.params.surveyId);
        console.log('loaded survey:', survey);
        const dummySurvey = {
            "surveyId": 1,
            "title": "Fried Chicken",
            "description": "A survey to determine who has the best fried chicken.",
            "dateCreated": 1551330000000,
            "closingDate": null,
            "template": true,
            "published": true,
            "questions": [
                {
                    "questionId": 1,
                    "question": "Who has the best fried chicken?",
                    "typeId": 2,
                    "answers": [

                        {
                            "id": 1,
                            "answer": "KFC",
                            "questionId": 1
                        },
                        {
                            "id": 2,
                            "answer": "Churchs",
                            "questionId": 1
                        },
                        {
                            "id": 3,
                            "answer": "Pollo",
                            "questionId": 1
                        },
                        {
                            "id": 4,
                            "answer": "Chicken Kitchen",
                            "questionId": 1
                        },
                        {
                            "id": 5,
                            "answer": "Publix",
                            "questionId": 1
                        }
                    ]
                },
                {
                    "questionId": 2,
                    "question": "Are you biased?",
                    "typeId": 1,
                    "answers": [

                        {
                            "id": 1,
                            "answer": "KFC",
                            "questionId": 2
                        },
                        {
                            "id": 2,
                            "answer": "Churchs",
                            "questionId": 2
                        },
                        {
                            "id": 3,
                            "answer": "Pollo",
                            "questionId": 2
                        },
                        {
                            "id": 4,
                            "answer": "Chicken Kitchen",
                            "questionId": 2
                        },
                        {
                            "id": 5,
                            "answer": "Publix",
                            "questionId": 2
                        }
                    ]
                },
                {
                    "questionId": 3,
                    "question": "test question",
                    "typeId": 1,
                    "answers": [

                        {
                            "id": 1,
                            "answer": "KFC",
                            "questionId": 3
                        },
                        {
                            "id": 2,
                            "answer": "Churchs",
                            "questionId": 3
                        },
                        {
                            "id": 3,
                            "answer": "Pollo",
                            "questionId": 3
                        },
                        {
                            "id": 4,
                            "answer": "Chicken Kitchen",
                            "questionId": 3
                        },
                        {
                            "id": 5,
                            "answer": "Publix",
                            "questionId": 3
                        }
                    ]
                },
                {
                    "questionId": 4,
                    "question": "How would you rate the interview?",
                    "typeId": 4,
                    "answers": [

                        {
                            "id": 1,
                            "answer": "KFC",
                            "questionId": 4
                        },
                        {
                            "id": 2,
                            "answer": "Churchs",
                            "questionId": 4
                        },
                        {
                            "id": 3,
                            "answer": "Pollo",
                            "questionId": 4
                        },
                        {
                            "id": 4,
                            "answer": "Chicken Kitchen",
                            "questionId": 4
                        },
                        {
                            "id": 5,
                            "answer": "Publix",
                            "questionId": 4
                        }
                    ]
                }
            ]
        }
        console.log('dummy Survey', dummySurvey);
        this.setState({
            survey: dummySurvey,
            surveyLoaded: true
        })
    }

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
            const responseToSubmit: IResponse = {
                "id": 0,
                "surveyId": this.state.survey.surveyId,
                "answerId": parseInt(key),
                "userEmail": "test@email.com"
            };
            surveyClient.saveResponse(responseToSubmit);
        }
        for (let key in this.state.newFeedback) {
            const newAnswer: IAnswer = {
                "id": 0,
                "answer": parseInt[key],
                "questionId": parseInt(key)
            }
            surveyClient.saveAnswer(newAnswer);
        }
        this.setState({
            redirectTo: '/surveys'
        })
    }

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
                                        this.state.survey.questions.map(question => (
                                            <div key={question.questionId} className="card form-group mb-3">
                                                <h5 className="card-header">{question.question}</h5>
                                                <div className="card-body">
                                                    {question.type === 5 ? (
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name={question.questionId}
                                                                value={this.state.newFeedback[question.questionId]}
                                                                onChange={this.handleFeedbackInput}
                                                                placeholder="Enter your response here"
                                                            />
                                                        </div>
                                                    ) : (
                                                            <>
                                                                {question.answers.map(choice => (
                                                                    <div key={choice.id} className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name={`question-${question.questionId}-choice`}
                                                                            value={choice.id}
                                                                            onChange={this.handleResponseInput}
                                                                        />
                                                                        <label className="form-check-label">
                                                                            {choice.answer} </label>
                                                                    </div>
                                                                ))}
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
                            <div>Loading</div>
                        )}
                </div>
            </div >
        )
    }
}