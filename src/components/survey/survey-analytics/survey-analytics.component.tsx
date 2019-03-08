import React from 'react';
import { Table } from 'reactstrap';

export class SurveyAnalyticsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table striped id="manage-users-table" className="tableUsers">
                <thead className="rev-background-color">
                <tr>
                    <th>View Data</th>
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
                </tbody>
        </Table>
        );
    }
}


export default SurveyAnalyticsComponent;