import React from 'react';
import { Table } from 'reactstrap';
import { ISurvey } from '../../../model/surveys/survey.model'

interface TemplatesProps {

}

interface TemplatesState {
    templates: ISurvey[],
    templatesLoaded: boolean
}

class TemplatesComponent extends React.Component<TemplatesProps, TemplatesState> {
    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            templatesLoaded: false
        }
    }

    componentDidMount() {
        this.loadTemplates();
    }

    // Load the templates into the state
    loadTemplates = () => {
        const dummyTemplates = [{
            surveyId: 1,
            title: 'Example Template 1',
            description: 'Example Template 1 Description',
            dateCreated: new Date('03-09-2019'),
            closingDate: new Date('03-25-2019'),
            template: false,
            published: true
        },
        {
            surveyId: 2,
            title: 'Example Template 2',
            description: 'Example Template 2 Description',
            dateCreated: new Date('02-15-2019'),
            closingDate: new Date('03-15-2019'),
            template: true,
            published: true
        },
        {
            surveyId: 3,
            title: 'Example Template 3',
            description: 'Example Template 3 Description',
            dateCreated: new Date('03-05-2019'),
            closingDate: new Date('03-22-2019'),
            template: false,
            published: false
        },
        {
            surveyId: 4,
            title: 'Example Template 4',
            description: 'Example Template 4 Description',
            dateCreated: new Date('03-10-2019'),
            closingDate: new Date('03-20-2019'),
            template: false,
            published: true
        }
        ]
        this.setState({
            templates: dummyTemplates,
            templatesLoaded: true
        })
    }

    render() {
        console.log('this.state', this.state);
        return (
            <>
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
                                <tr key={template.surveyId} className="rev-table-row">
                                    <td>{template.title}</td>
                                    <td>{template.description}</td>
                                    <td>{template.dateCreated.toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                        <div>Loading...</div>
                    )}
            </>
        );
    }
}

export default TemplatesComponent;