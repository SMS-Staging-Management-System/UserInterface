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
import { toast } from 'react-toastify';
import { IAuthState } from '../../../reducers/management';

interface TemplatesProps extends RouteComponentProps<{}> {
    auth: IAuthState;
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
                creator: '',
                dateCreated: new Date(),
                closingDate: null,
                template: false,
                questionJunctions: []
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
            description: event.target.value,
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
            showModal: false,
            survey: {},
            surveyLoaded: false
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
                description: this.state.description
            })
        } else {
            this.setState({
                description: this.state.survey.description
            })

        }
        
        this.setState({
            dateCreated: this.state.dateCreated,
            showModal: false,
            surveyId: 0
        })

        const dummySurvey: ISurvey = {
            closingDate: new Date(new Date().getTime() + 604800000),
            creator: this.props.auth.currentUser.email,
            dateCreated: this.state.dateCreated,
            description: this.state.description,
            questionJunctions: [],
            surveyId: 0,
            template: false,
            title: this.state.newTitle,
        };
        const questionJunctions: IJunctionSurveyQuestion[] = [];
        
        for (let i = 0; i < (this.state.survey.questionJunctions).length; i++) {

            const dummyQuestionJunction: any = {
                id: 0,
                question: {
                    questionId: 0,
                    typeId: this.state.survey.questionJunctions[i].question.typeId,
                    question: this.state.survey.questionJunctions[i].question.question,
                    answers: []
                },
                questionOrder: this.state.survey.questionJunctions[i].questionOrder,
                survey: null,
            }
    
            for (let j = 0; j < (this.state.survey.questionJunctions[i].question.answers).length; j++) {

                let dummyAnswers: IAnswer | any = {
                    answer: '',
                    answerId: 0,
                    question: null
                }
                dummyAnswers.answer = this.state.survey.questionJunctions[i].question.answers[j].answer;
                dummyQuestionJunction.question.answers.push(dummyAnswers);
            }
            questionJunctions.push(dummyQuestionJunction);
        }

        dummySurvey.questionJunctions = questionJunctions;

        surveyClient.saveSurvey(dummySurvey);

        console.log(dummySurvey);

        toast.success('Survey created');
        
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
                                    <div key={questionJunction.question.questionId}>

                                        <strong>{questionJunction.question.question}:</strong>

                                        {
                                            questionJunction.question.typeId === 5 ?
                                                <div>Question Type: Feedback</div>
                                                : questionJunction.question.answers.map(choice => (
                                                    <div key={choice.answerId} >
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