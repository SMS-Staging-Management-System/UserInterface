import React, { Fragment, Component } from 'react';
import { Table } from 'reactstrap';
//import { ISurvey } from '../../../model/surveys/survey.model';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { RouteComponentProps, Redirect } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa'



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
            surveyId: 0,
            surveyLoaded: false,
            openedTemplate: [],
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



    handleShow = async (id: number, description: string) => {

        this.setState({
            showModal: true
        })
        const openedTemplate = await surveyClient.findSurveyById(id);

        this.setState({
            survey: openedTemplate,
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

    handleCreateClose = () => {
        this.setState({
            showModal: false,
            surveyId: 0,
            title: this.state.newTitle,
            dateCreated: new Date()
            //redirectTo: `/surveys/build/${this.state.survey.surveyId}`

        })
        let questions: any = [];
        let answers: any = [];
        let temp = this.state.survey;
        temp.surveyId = 0;
        for (let i = 0; i < this.state.survey.questionJunctions.length; i++) {
            questions.push(this.state.survey.questionJunctions[i].questionId);

        }

        for (let index = 0; index < questions.length; index++) {
            for (let j = 0; j < questions[index].answerChoices.length; j++) {
                answers.push(questions[index].answerChoices[j]);
            }

        }
        console.log('AHAHAHAHAAHA', this.state.survey);
        console.log('Survey', this.state.survey.questionJunctions);
        surveyClient.saveSurvey(temp);
        surveyClient.saveAllQuestion(questions);
        surveyClient.saveAllAnswer(answers);
        //surveyClient.saveToQuestionJunction()
        console.log('NEW QUESTIONS', questions, 'AND ANSWERS', answers)
    }


    changeSurveyTitle = (event) => {
        this.setState({
            newTitle: event.target.value,

        })
        console.log(this.state.newTitle);
    }


    render() {


        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        console.log('this.state', this.state);
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
                        <div className="modalHeading">
                            <strong>Survey Title</strong>:&nbsp;
                            <input type="text"
                                className="surveyName"
                                defaultValue={this.state.survey.title}
                                onChange={this.changeSurveyTitle} />
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