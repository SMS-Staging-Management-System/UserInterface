import React, { Fragment, Component } from 'react';
import { Table } from 'reactstrap';
//import { ISurvey } from '../../../model/surveys/survey.model';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { RouteComponentProps, Redirect } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle, FaHandPointRight } from 'react-icons/fa'
import { IJunctionSurveyQuestion } from '../../../model/surveys/junction-survey-question.model';
import { IQuestion } from '../../../model/surveys/question.model';
import { IAnswer } from '../../../model/surveys/answer.model';
import { ISurvey } from '../../../model/surveys/survey.model';



interface TemplatesProps extends RouteComponentProps<{}> {
    match: any
}


// interface ITemplatesState {

//     //redirectTo: any
// }

class TemplatesComponent extends Component<TemplatesProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            templatesLoaded: false,
            showModal: false,
            newTitle: '',
            newDescription: '',
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
            }

        }


    }


    componentDidMount() {
        this.loadTemplates();
        //this.handleShow(this.state.survey.surveyId);

    }



    // Load the templates into the state
    loadTemplates = async () => {
        const templates = await surveyClient.findAllSurveys();
        this.setState({
            templates: templates,
            templatesLoaded: true
        })
        console.log(templates);
        console.log("Template Loaded", this.state.templatesLoaded);
    };

    changeSurveyTitle = (event) => {
        this.setState({
            newTitle: event.target.value,
        })
        console.log('NEW TITLE ', this.state.newTitle);
    }
    changeSurveyDescription = (event) => {
        this.setState({
            newDescription: event.target.value,
        })
        console.log('NEW DESCRIPTION ', this.state.newDescription);
    }


    handleShow = async (id: number, description: string) => {

        this.setState({
            showModal: true
        })
        const openedTemplate = await surveyClient.findSurveyById(id);

        this.setState({
            survey: openedTemplate,
            newTitle: openedTemplate.title,
            surveyLoaded: true,
            description: description

        })

        console.log("open template", openedTemplate, " Description", this.state.description);

    }
    handleClose = () => {
        this.setState({
            survey: {},
            surveyLoaded: false,
            showModal: false

        })




    }

    handleCreateClose = async () => {
        console.log('Current title', this.state.survey.title, '   New title', this.state.newTitle);
        if (this.state.survey.title !== this.state.newTitle) {
            this.setState({
                newTitle: this.state.newTitle,
                showModal: false,
                surveyId: 0,
                description: this.state.newDescription,
                dateCreated: this.state.dateCreated
            })
        } else {
            this.setState({
                showModal: false,
                surveyId: 0,
                newTitle: this.state.survey.title,
                description: this.state.newDescription,
                dateCreated: this.state.dateCreated
                //redirectTo: `/surveys/build/${this.state.survey.surveyId}`

            })
        }

        // else {
        //     this.setState({
        //         newTitle: this.state.survey.title
        //     })
        // }


        let questions: IQuestion[] = [];
        let answers: IAnswer[] = [];
        let dummySurvey: ISurvey = {
            surveyId: 1,
            title: this.state.newTitle,
            description: this.state.description,
            dateCreated: this.state.dateCreated,
            closingDate: this.state.survey.closingDate,
            template: false,
            published: true
        };
        for (let i = 0; i < this.state.survey.questionJunctions.length; i++) {
            console.log('THESE ARE THE QUESTION JUNCTIONS', this.state.survey.questionJunctions[i]);
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
            console.log(dummyquestion);
            for (let j = 0; j < this.state.survey.questionJunctions[i].questionId.answerChoices.length; j++) {

                let dummyAnswers: IAnswer | any = {
                    id: 0,
                    answer: "string",
                    questionId: 0
                }
                dummyAnswers.id = this.state.survey.questionJunctions[i].questionId.answerChoices[j].id;
                dummyAnswers.answer = this.state.survey.questionJunctions[i].questionId.answerChoices[j].answer;
                dummyAnswers.questionId = this.state.survey.questionJunctions[i].questionId.answerChoices[j].questionId;
            console.log(dummyAnswers);
                answers.push(dummyAnswers);
            }
            questions.push(dummyquestion);
        }

        // for (let index = 0; index < questions.length; index++) {
        //     for (let j = 0; j < questions[index].answerChoices.length; j++) {
        //         dummyAnswers.answer = questions[index].answerChoices[j].answer
        //         answers.push(questions[index].answerChoices[j]);
        //     }

        // }
        // console.log('Survey', this.state.survey.questionJunctions);
        dummySurvey.surveyId = await surveyClient.saveSurvey(dummySurvey);
        let questionid = new Array;

        for (let index = 0; index < questions.length; index++) {
            // console.log('this is a question ',questions[index]);
            let num = await surveyClient.saveQuestion(questions[index]);
            questionid.push(num);

            for (let j = 0; j < answers.length; j++) {
                // console.log('this is the answer id ', answers[j].questionId, 'this is a question ', questions[index])
                if (answers[j].questionId === questions[index].questionId.questionId) {
                    answers[j].questionId = questionid[index];
                    surveyClient.saveAnswer(answers[j]);
                }
            }

        }


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
        for (let index = 0; index < questions.length; index++) {
            junctionTable.questionId.question = questions[index].questionId.question;
            junctionTable.questionId.questionId = questionid[index];
            junctionTable.questionId.typeId = questions[index].questionId.typeId;
            junctionTable.questionOrder = index + 1;
            junctionTable.surveyId = dummySurvey;
            junctionTable.surveyId.surveyId = dummySurvey.surveyId;
            surveyClient.saveToQuestionJunction(junctionTable);
            // console.log(junctionTable);
        }
        // console.log('NEW QUESTIONS', questions, 'AND ANSWERS', answers)
    }



    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        // console.log('this.state', this.state);
        return (
            <Fragment>
                {this.state.templatesLoaded ? (
                    this.state.templates ? (
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
                                    <tr key={template.surveyId} className="rev-table-row"
                                        onClick={() => this.handleShow(template.surveyId, template.description)}>
                                        <td>{template.title}</td>
                                        <td>{template.description}</td>
                                        <td>{template.dateCreated && new Date(template.dateCreated).toDateString()}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    ) : (
                            <div>No Templates to Display</div>
                        )
                ) : (
                        <div>Loading...</div>
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
                                    <div>Loading...Please wait</div>
                                )}

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="buttonBack" onClick={() => this.handleClose()}>Back</Button>
                        <Button className="buttonCreate" onClick={() => this.handleCreateClose()}>Create</Button>

                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default TemplatesComponent;

// const dummyTemplates = [{
        // surveyId: 1,
        // title: 'Example Template 1',
        // description: 'Example Template 1 Description',
        // dateCreated: new Date('03-09-2019'),
        // closingDate: new Date('03-25-2019'),
        // template: false,
        // published: true
        // },
        // {
        // surveyId: 2,
        // title: 'Example Template 2',
        // description: 'Example Template 2 Description',
        // dateCreated: new Date('02-15-2019'),
        // closingDate: new Date('03-15-2019'),
        // template: true,
        // published: true
        // },
        // {
        // surveyId: 3,
        // title: 'Example Template 3',
        // description: 'Example Template 3 Description',
        // dateCreated: new Date('03-05-2019'),
        // closingDate: new Date('03-22-2019'),
        // template: false,
        // published: false
        // },
        // {
        // surveyId: 4,
        // title: 'Example Template 4',
        // description: 'Example Template 4 Description',
        // dateCreated: new Date('03-10-2019'),
        // closingDate: new Date('03-20-2019'),
        // template: false,
        // published: true
        // }
        //]