import React from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';
import { Bar, Pie } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import { IState } from '../../../reducers';
import { RouteComponentProps } from 'react-router';
import Loader from '../Loader/Loader';
import { connect } from 'react-redux';

interface IComponentProps extends RouteComponentProps<{}> {
    match: any
};

interface IComponentState {
    surveyData: any,
    surveyDataLoaded: boolean,
    redirectTo: any
};

class SurveyAnalyticsComponent extends React.Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            surveyData: [],
            surveyDataLoaded: false,
            redirectTo: null
        }
    }


    componentWillMount() {
        this.loadSurveyData();
    }

    loadSurveyData = async () => {
        const survey = await surveyClient.findSurveyByIdWithResponses(this.props.match.params.surveyId);

        // Set up the survey data object
        let surveyData: any = {};
        surveyData.title = survey.title;
        surveyData.questions = [];
        // loop through each of the questions
        for (let questionKey in survey.questionJunctions) {
            surveyData.questions[questionKey] = {
                questionText: survey.questionJunctions[questionKey].questionId.question,
                questionType: survey.questionJunctions[questionKey].questionId.typeId,
                questionData: {
                    labels: [],
                    datasets: [{
                        label: 'Number of Responses',
                        data: [],
                        backgroundColor: [],
                        borderColor: [],
                        borderWidth: 1
                    }]
                }
            };

            // If it's a feedback question, just grab the answer choices
            if (survey.questionJunctions[questionKey].questionId.typeId === 5) {
                surveyData.questions[questionKey].answerChoices = survey.questionJunctions[questionKey].questionId.answerChoices;
            } else {
                // Loop through all of the question choices for this question and get the data
                for (let choiceKey in survey.questionJunctions[questionKey].questionId.answerChoices) {
                    // Save the data for each answer choice
                    surveyData.questions[questionKey].questionData.datasets[0].data.push(survey.questionJunctions[questionKey].questionId.answerChoices[choiceKey].responseCount);
                    // Save the labels for each answer choice
                    surveyData.questions[questionKey].questionData.labels.push(survey.questionJunctions[questionKey].questionId.answerChoices[choiceKey].answer);
                    // Generate a color and save it in the data
                    const color = this.random_rgba();
                    surveyData.questions[questionKey].questionData.datasets[0].backgroundColor.push(color);
                    surveyData.questions[questionKey].questionData.datasets[0].borderColor.push(color);
                };
            };
        };
        this.setState({
            surveyData: surveyData,
            surveyDataLoaded: true
        });
    }

    // Generate a random color
    random_rgba = () => {
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ', 0.6)';
    }

    render() {
        const options = {
            annotation: {
                annotations: [{
                    drawTime: 'afterDatasetsDraw',
                    borderColor: 'white',
                    borderDash: [2, 2],
                    borderWidth: 2,
                    mode: 'vertical',
                    type: 'line',
                    value: 10,
                    scaleID: 'x-axis-0',
                }]
            },
            maintainAspectRation: false
        };
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            // <h2>Analytics: {this.state.surveyData.title}</h2>
            // <h2>Survey Data Page for survey </h2>
            <div className="container">
                <div className="jumbotron">
                    {this.state.surveyDataLoaded ? (
                        <>
                            <h2 className="mb-3">Analytics: {this.state.surveyData.title}</h2>
                            {
                                this.state.surveyData.questions.map((question, index) => (
                                    <div key={index} className="card form-group mb-3">
                                        <h5 className="card-header">{question.questionText}</h5>
                                        <div className="card-body">
                                            {question.questionType === 5 ? (
                                                <>
                                                    <div className="card-title">Feedback submitted by survey-takers:</div>
                                                    <ul className="list-group list-group-flush">
                                                        {question.answerChoices.map(choice => (
                                                            <li key={choice.id} className="list-group-item">{choice.answer}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            ) : (
                                                    (question.questionType === 1 || question.questionType === 6) ? (
                                                        <>
                                                            <Pie
                                                                data={question.questionData}
                                                            /></>
                                                    ) : (
                                                            <>
                                                                <Bar
                                                                    data={question.questionData}
                                                                    width={100}
                                                                    height={50}
                                                                    options={options}
                                                                /></>
                                                        )
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                            <Loader />
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(SurveyAnalyticsComponent);