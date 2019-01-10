import * as React from 'react';
import { Table } from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';

export interface IManageInternalComponentProps {
  manageUsers: ICognitoUser[];
}

export class ManageInternalComponenet extends React.Component<IManageInternalComponentProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Table striped id="manage-users-table">
          <thead className="rev-background-color">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row">
                  <td></td>
                  <td></td>
                  <td>{user.email}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
    )
  }
}