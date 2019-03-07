import * as React from 'react';
import { Table } from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';
// import ViewUserModal from '../view-user-modal/view-user-modal.container';

export interface IManageInternalComponentProps {
  manageUsers: ICognitoUser[];
  toggleViewUserModal: () => void;
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row" onClick={this.props.toggleViewUserModal}>
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