import React, { Fragment, Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { RouteComponentProps, Redirect } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle, FaHandPointRight } from 'react-icons/fa'
import { IJunctionSurveyQuestion } from '../../../model/surveys/junction-survey-question.model';
import { IQuestion } from '../../../model/surveys/question.model';
import { IAnswer } from '../../../model/surveys/answer.model';
import { ISurvey } from '../../../model/surveys/survey.model';
import Loader from '../Loader/Loader';
import { IState } from '../../../reducers';

interface TemplatesProps extends RouteComponentProps<{}> {
    match: any
}
interface IComponentState {
    templates: any,
    templatesLoaded: boolean,
    newTitle: string,
    newDescription: string,
    description: string,
    showModal: boolean,
    surveyId: number,
    surveyLoaded: boolean,
    openedTemplate: any,
    dateCreated: any,
    survey: any,
    redirectTo: any
};

class TemplatesComponent extends Component<TemplatesProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            templatesLoaded: false,
            newTitle: '',
            newDescription: '',
            description: '',
            showModal: false,
            surveyId: 0,
            surveyLoaded: false,
            openedTemplate: [],
            dateCreated: Date.now(),
            survey: {
                surveyId: 0,
                title: '',
                description: '',
                dateCreated: new Date(),
                closingDate: null,
                template: false,
                published: true
            },
            redirectTo: null
        }

    }

    componentDidMount() {
        this.loadTemplates();
    }

    // Load the templates into the state
    loadTemplates = async () => {
        const templates = await surveyClient.findAllTemplates();
        this.setState({
            templates: templates,
            templatesLoaded: true
        })
    };

    changeSurveyTitle = (event) => {
        this.setState({
            newTitle: event.target.value,
        })
    }
    
    changeSurveyDescription = (event) => {
        this.setState({
            newDescription: event.target.value,
        })
    }

    handleShow = async (id: number, description: string) => {
        this.setState({
            showModal: true
        })
        const openedTemplate = await surveyClient.findSurveyById(id);
        this.setState({
            survey: openedTemplate,
            newTitle: openedTemplate.title,	            //surveyId: id,
            surveyLoaded: true,
            description: description


        })
    }

    handleClose = () => {
        this.setState({
            survey: {},
            surveyLoaded: false,
            showModal: false
        })
    }

    handleCreateClose = async () => {
        if (this.state.survey.title !== this.state.newTitle) {
            this.setState({
                newTitle: this.state.newTitle,
            })
        }
        else {
            this.setState({
                newTitle: this.state.survey.title,
            })
        }

        if (this.state.survey.description !== this.state.newDescription) {
            this.setState({
                newDescription: this.state.newDescription
            })
        } else {
            this.setState({
                newDescription: this.state.survey.description
            })

        }
        this.setState({
            showModal: false,
            surveyId: 0,
            dateCreated: this.state.dateCreated
        })

        let questions: IQuestion[] = [];
        let answers: IAnswer[] = [];
        let dummySurvey: ISurvey = {
            surveyId: 1,
            title: this.state.newTitle,
            description: this.state.newDescription,
            dateCreated: this.state.dateCreated,
            closingDate: this.state.survey.closingDate,
            template: false,
            published: true
        };
        for (let i = 0; i < this.state.survey.questionJunctions.length; i++) {
            let dummyquestion: IQuestion | any = {
                questionId: {
                    questionId: 0,
                    question: 'string',
                    typeId: 0,
                }
            }
            dummyquestion.questionId.questionId = this.state.survey.questionJunctions[i].questionId.questionId;
            dummyquestion.questionId.typeId = this.state.survey.questionJunctions[i].questionId.typeId;
            dummyquestion.questionId.question = this.state.survey.questionJunctions[i].questionId.question;
            for (let j = 0; j < this.state.survey.questionJunctions[i].questionId.answerChoices.length; j++) {

                let dummyAnswers: IAnswer | any = {
                    id: 0,
                    answer: "string",
                    questionId: 0
                }
                dummyAnswers.id = this.state.survey.questionJunctions[i].questionId.answerChoices[j].id;
                dummyAnswers.answer = this.state.survey.questionJunctions[i].questionId.answerChoices[j].answer;
                dummyAnswers.questionId = this.state.survey.questionJunctions[i].questionId.answerChoices[j].questionId;
                answers.push(dummyAnswers);
            }
            questions.push(dummyquestion);
        }

        dummySurvey.surveyId = await surveyClient.saveSurvey(dummySurvey);
        let questionid = new Array;

        for (let index = 0; index < questions.length; index++) {
            let num = await surveyClient.saveQuestion(questions[index]);
            questionid.push(num);

            for (let j = 0; j < answers.length; j++) {
                if (answers[j].questionId === questions[index].questionId.questionId) {
                    answers[j].questionId = questionid[index];
                    await surveyClient.saveAnswer(answers[j]);
                }
            }

        }

        for (let index = 0; index < questions.length; index++) {
            let junctionTable: IJunctionSurveyQuestion = {

                id: 0,

                questionId: {
                    questionId: 0,
                    question: 'string',
                    typeId: 0,
                },
                questionOrder: 0,

                surveyId: dummySurvey,

            }

            junctionTable.questionId.question = questions[index].questionId.question;
            junctionTable.questionId.questionId = questionid[index];
            junctionTable.questionId.typeId = questions[index].questionId.typeId;
            junctionTable.questionOrder = index + 1;
            junctionTable.surveyId = dummySurvey;
            junctionTable.surveyId.surveyId = dummySurvey.surveyId;
            surveyClient.saveToQuestionJunction(junctionTable);
        }
    }
    handleDuplicateClose = async () => {
        if (this.state.survey.title !== this.state.newTitle) {
            this.setState({
                newTitle: this.state.newTitle,
            })
        }
        else {
            this.setState({
                newTitle: this.state.survey.title,
            })
        }

        if (this.state.survey.description !== this.state.newDescription) {
            this.setState({
                newDescription: this.state.newDescription
            })
        } else {
            this.setState({
                newDescription: this.state.survey.description
            })

        }
        this.setState({
            showModal: false,
            surveyId: 0,
            dateCreated: this.state.dateCreated
        })
        this.props.history.push({
        pathname: '/surveys/build',
        state: { displaySurvey: this.state.survey }});

        
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <Fragment>

                {this.state.templatesLoaded ? (
                    this.state.templates.length ? (
                        <Table striped id="manage-users-table" className="tableUsers">
                            <thead className="rev-background-color">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.templates.map(template => (
                                    <tr key={template['surveyId']} className="rev-table-row"
                                        onClick={() => this.handleShow(template['surveyId'], template['description'])}>
                                        <td>{template['title']}</td>
                                        <td>{template['description']}</td>
                                        <td>{template['dateCreated'] && new Date(template['dateCreated']).toDateString()}</td>
                                    </tr>

                                ))}
                            </tbody>

                        </Table>

                    ) : (
                            <div>No Templates to Display</div>
                        )
                ) : (
                        <Loader />
                    )}

                <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="surveyInfoCircle"><FaInfoCircle /> <strong>This is how your survey will look</strong></div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div ><FaHandPointRight /> <i><span className="noteDiv">Note that you can edit both the survey title and description</span></i></div>
                        <div className="modalHeading">
                            <strong>Survey Title</strong>:&nbsp;
                            <input type="text"
                                className="surveyName"
                                defaultValue={this.state.survey.title}
                                onChange={this.changeSurveyTitle} />&nbsp;
                            <strong>Description</strong>:&nbsp;
                                <input
                                type="text"
                                className="surveyDescription"
                                defaultValue={this.state.survey.description}
                                onChange={this.changeSurveyDescription} />
                        </div>
                        <div className="container" id="containerTemplate">

                            {this.state.surveyLoaded ?
                                this.state.surveyLoaded &&
                                this.state.survey.questionJunctions.map(questionJunction => (
                                    <div key={questionJunction.questionId.questionId}>

                                        <strong>{questionJunction.questionId.question}:</strong>

                                        {
                                            questionJunction.questionId.typeId === 5 ?
                                                <div>Question Type: Feedback</div>
                                                : questionJunction.questionId.answerChoices.map(choice => (
                                                    <div key={choice.id} >
                                                        <label>
                                                            <i>{choice.answer}</i> </label>
                                                    </div>
                                                ))
                                        }
                                        <hr />
                                    </div>
                                )) : (
                                    <Loader />
                                )}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="buttonBack" onClick={() => this.handleClose()}>Back</Button>
                        <Button className="buttonCreate" onClick={() => this.handleDuplicateClose()}>Duplicate</Button>
                        <Button className="buttonCreate" onClick={() => this.handleCreateClose()}>Create</Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(TemplatesComponent);