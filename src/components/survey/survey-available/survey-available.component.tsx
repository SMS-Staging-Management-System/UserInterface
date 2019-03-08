import React from 'react';
import { Table } from 'reactstrap';

export class SurveyAvailableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table striped id="manage-users-table" className="tableUsers">
                <thead className="rev-background-color">
                <tr>
                    <th>Your Surveys Available</th>
                </tr>
                </thead>
                <tbody>
                    <tr className="rev-table-row">
                        <td>QC Survey</td>
                    </tr>
                </tbody>
          </Table>
        );
    }
}

export default SurveyAvailableComponent;