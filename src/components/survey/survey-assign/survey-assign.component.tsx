import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import SurveyModal from './survey-assign-modal.component';

export class SurveyAssignComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Table striped id="manage-users-table" className="tableUsers">
                    <thead className="rev-background-color">
                    <tr>
                        <th>Surveys To Assign</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className="rev-table-row">
                            <td>QC Survey</td>
                        </tr>
                        <tr className="rev-table-row">
                            <td>Template 1</td>
                        </tr>
                        <tr className="rev-table-row">
                            <td>Template 2</td>
                        </tr>
                        <tr className="rev-table-row">
                            <td>Template 3</td>
                        </tr>
                    </tbody>
                </Table>

                <div className="buttonDiv">
                    <tr><SurveyModal buttonLabel='Assign To Users' className='assignSurveyBtn'/></tr>
                </div>
            </Fragment>
        );
    }
}


export default SurveyAssignComponent;