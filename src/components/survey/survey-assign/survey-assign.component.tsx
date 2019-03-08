import React, { Fragment } from 'react';
import { Table, Input } from 'reactstrap';
import SurveyModal from './survey-assign-modal.component';

export class SurveyAssignComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Table striped id="manage-users-table" className="tableUsers">
                    <thead className="rev-background-color" >
                        <tr >
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="rev-table-row">
                            <td><Input type="checkbox" /></td>
                            <td>Dunieski</td>
                            <td>Otano</td>
                            <td>dunieskior@gmail.com</td>
                        </tr>
                        <tr className="rev-table-row">
                            <td><Input type="checkbox" /></td>
                            <td>Kyle</td>
                            <td>Serrecchia</td>
                            <td>kyserrecchia@gmail.com</td>
                        </tr>
                        {/* {
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row">
                  <td></td>
                  <td></td>
                  <td>{user.email}</td>
                </tr>
              )
            } */}

                    </tbody>
                </Table>
                <div className="buttonDiv">
                    {/* <tr><button type="submit" className="assignSurveyBtn">Assign Survey</button></tr> */}
                    <tr><SurveyModal buttonLabel='Assign Survey' className='assignSurveyBtn'/></tr>
                </div>
            </Fragment>
        );
    }
}


export default SurveyAssignComponent;