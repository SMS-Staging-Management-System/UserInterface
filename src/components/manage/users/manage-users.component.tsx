import * as React from 'react';
import { Table } from 'reactstrap';
import { ManageUserNavComponent } from './manage-users-nav/manage-users-nav.component';
import { IManageUserNavComponentProps } from './manage-users.container';


export class ManageUsersComponenet extends React.Component<IManageUserNavComponentProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.manageGetUsersByGroup(this.props.match.params.group);
  }

  updateManageUsersTable = (groupName: string) => {
    this.props.manageGetUsersByGroup(groupName);
  }

  render() {
    return (
      <div id="manage-users-container">
        <ManageUserNavComponent updateManageUsersTable={this.updateManageUsersTable} role={this.props.match.params.group}/>
        <Table striped id="manage-users-table">
          <thead>
            <tr className="rev-background-color">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.manageUsers.manageUsers.map((user) => 
                    <tr key={user.email} className="rev-table-row">
                      <td></td>
                      <td></td>
                      <td>{user.email}</td>
                    </tr>
               )
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

// const mapStateToProps = (state: IState) => state.manager
// const mapDispatchToProps = {
//    ...managerActions
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersTabComponenet)