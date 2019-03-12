import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
//import { ISurvey } from '../../../model/surveys/survey.model';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';
import { Modal, Button} from 'react-bootstrap';



interface TemplatesProps {
    //showModal: false,
    // handleShow: (id: number) => void,
    // handleClose: () => void
}

// interface TemplatesState {
//     templates: ISurvey[],
//     templatesLoaded: boolean,
//     showModal: false
//}

class TemplatesComponent extends React.Component<TemplatesProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            templatesLoaded: false,
            showModal: false,
            surveyId: 0
        }

    }


    componentDidMount() {
        this.loadTemplates();
    }

    // Load the templates into the state
    loadTemplates = async () => {
        const templates = await surveyClient.findAllSurveys();
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
        this.setState({
            templates: templates,
            templatesLoaded: true
        })
    }

    handleShow = async (id, title) => {
        this.setState({
            showModal: true,
            surveyId: id,
            title: title
        })
        const openedTemplate = await surveyClient.findSurveyById(id);
        console.log(openedTemplate);

    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleCreateClose =(surveyId: number) =>{
        this.setState({
            showModal: false,
            redirectTo: `/surveys/build/${surveyId}`
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        console.log('this.state', this.state);
        return (
            <Fragment>
                {this.state.templatesLoaded ? (
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
                                onClick={() => this.handleShow(template.surveyId, template.title)}>
                                    <td>{template.title}</td>
                                    <td>{template.description}</td>
                                    <td>{template.dateCreated && new Date(template.dateCreated).toDateString()}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                ) : (
                        <div>Loading...</div>
                    )}
                <Modal show={this.state.showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Survey Id: {this.state.surveyId}
                        <hr/>
                        Title: {this.state.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You can either create a new template or edit a survey using the template</Modal.Body>
                    <Modal.Footer>
                        <Button className="buttonEdit" onClick={() => this.handleClose()}>
                            Edit
            </Button>
                        <Button className="buttonCreate" onClick={() => this.handleCreateClose(this.state.surveyId)}>
                            Create
            </Button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default TemplatesComponent;