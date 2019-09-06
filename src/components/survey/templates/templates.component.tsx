import React, { Fragment, Component } from 'react';
import { Table, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
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
    redirectTo: any,
    page: number,
    prev: boolean,
    next: boolean,
    search: string,
    foundAll: boolean
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
                //published: true,
                questionJunctions: []
            },
            redirectTo: null,
            page: 0,
            prev: false,
            next: true,
            search: '',
            foundAll: true
        }
    }
    componentDidMount() {
        this.loadTemplates(0);
    }
    // Load the templates into the state
    loadTemplates = async (page: number) => {
        if(this.state.foundAll === true){
            const templates = await surveyClient.findAllTemplates(this.props.auth.currentUser.email, page);
            this.setState({
                templates: templates,
                templatesLoaded: true
            });
        } else if(this.state.foundAll === false) {
            const templates = await surveyClient.findByTitle(this.state.search, page);
            this.setState({
                templates: templates,
                templatesLoaded: true
            });
        }

        if(surveyClient.currentPage() <= 1) {
            if(surveyClient.currentPage() !== surveyClient.totalPages()){
                this.setState({
                prev: true,
                next: false
            });} else {
                this.setState({
                    prev: true,
                    next: true
                });
            }   
        } else if(surveyClient.currentPage() >= surveyClient.totalPages()){
            this.setState({
                prev: false,
                next: true
            });
        } else {
            this.setState({
                prev: false,
                next: false
            });
        }
    }

    changeSearch = async (flip: boolean) => {
        await this.setState({
            foundAll: flip
        });
        this.loadTemplates(0);
    }

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
            newTitle: openedTemplate.title,             //surveyId: id,
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
                description: this.state.description
            })
        } else {
            this.setState({
                description: this.state.survey.description
            })
        }
        
        this.setState({
            showModal: false,
            surveyId: 0,
            dateCreated: this.state.dateCreated
        })
        let dummySurvey: ISurvey = {
            surveyId: 0,
            title: this.state.newTitle,
            description: this.state.description,
            creator: this.props.auth.currentUser.email,
            dateCreated: this.state.dateCreated,
            closingDate: this.state.survey.closingDate,
            template: false,
            questionJunctions: []
        };
        let questionJunctions: IJunctionSurveyQuestion[] = [];
        
        for (let i = 0; i < (this.state.survey.questionJunctions).length; i++) {

            let dummyQuestionJunction: any = {
                id: 0,
                survey: null,
                question: {
                    questionId: 0,
                    typeId: this.state.survey.questionJunctions[i].question.typeId,
                    question: this.state.survey.questionJunctions[i].question.question,
                    answers: []
                },
                questionOrder: this.state.survey.questionJunctions[i].questionOrder
            }
    
            for (let j = 0; j < (this.state.survey.questionJunctions[i].question.answers).length; j++) {

                let dummyAnswers: IAnswer | any = {
                    answerId: 0,
                    answer: '',
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
            state: { displaySurvey: this.state.survey }
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            search: event.target.value
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <Fragment>
                {this.state.templatesLoaded ? (
                    this.state.templates.length ? (
                        <div>
                            <div>
                           <InputGroup>
                           <InputGroupAddon addonType="prepend">
                           <InputGroupText>
                           {/* <Input addon type="checkbox" aria-label="Checkbox for following text input" /> */}
                           <Button type="button" aria-label="Checkbox for following text input" onClick={() =>this.changeSearch(false)}>Search</Button>
                           </InputGroupText>
                           </InputGroupAddon>
                           <Input id="template-search-bar" placeholder="Enter Template Name" onChange={this.handleChange}/>
                           </InputGroup>
                           </div>
                           <br />
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
                            {/* button goes here pick up here */}
                            <div className='row horizontal-centering vertical-centering'>
                            <Button variant="secondary" className="rev-background-color div-child" onClick={() => this.changeSearch(true)} disabled={this.state.foundAll}>All Templates</Button>
                            <h6 className="div-child text-style" >
                                          
                                </h6>
                                <Button variant="secondary" className="rev-background-color div-child" onClick={() => this.loadTemplates(-1)} disabled={this.state.prev}>Prev</Button>
                                <h6 className="div-child text-style" >
                                    Page {surveyClient.currentPage()} of {surveyClient.totalPages()}
                                </h6>
                                <Button variant="secondary" className="rev-background-color div-child" onClick={() => this.loadTemplates(1)} disabled={this.state.next}>Next</Button>
                            </div>
                        </div>
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
                        <Button className="buttonCreate" onClick={() => this.handleDuplicateClose()}>Duplicate</Button>
                        <Button className="buttonCreate" onClick={() => this.handleCreateClose()}>Create</Button>
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
                        {/* <Button className="buttonBack" onClick={() => this.handleClose()}>Back</Button> */}
                        {/* <Button className="buttonCreate" onClick={() => this.handleDuplicateClose()}>Duplicate</Button>
                        <Button className="buttonCreate" onClick={() => this.handleCreateClose()}>Create</Button> */}
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